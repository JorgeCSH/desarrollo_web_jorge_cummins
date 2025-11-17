package com.tarea4.tarea4.services;

import com.tarea4.tarea4.models.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppService {

    private final AvisoAdopcionRepository avisoRepository;
    private final ComunaRepository comunaRepository;
    private final FotoRepository fotoRepository;
    private final ContactarPorRepository contactarPorRepository;
    public AppService (
            AvisoAdopcionRepository avisoRepository,
            ComunaRepository comunaRepository,
            FotoRepository fotoRepository,
            ContactarPorRepository contactarPorRepository) {
        this.avisoRepository = avisoRepository;
        this.comunaRepository = comunaRepository;
        this.fotoRepository = fotoRepository;
        this.contactarPorRepository = contactarPorRepository;
    }

    // Directorio para subir archivos
    private static final String directorioSubida = "static/uploads/fotos";
    private static final Set<String> archivosValidos = new HashSet<>(Arrays.asList("png", "jpg", "jpeg"));



    // Metodo para obtener los ultimos 5 avisos subidos.
    public List<Map<String, Object>> getUltimosAvisos() {
        List<AvisoAdopcion> avisos = avisoRepository.findTop5ByOrderByFechaIngresoDesc();

        return avisos.stream().map(aviso -> {
            Map<String, Object> avisoMap = new HashMap<>();
            avisoMap.put("id", aviso.getId());
            avisoMap.put("fechaIngreso", aviso.getFechaIngreso());
            avisoMap.put("comuna", aviso.getComuna().getNombre());
            avisoMap.put("sector", aviso.getSector());
            avisoMap.put("cantidad", aviso.getCantidad());
            avisoMap.put("tipo", aviso.getTipo().name());
            avisoMap.put("edad", aviso.getEdad());
            avisoMap.put("unidadMedida", aviso.getUnidadMedida().name());

            // Obtener primera foto
            Optional<Foto> primeraFoto = fotoRepository.findFirstByAvisoId(aviso.getId());
            avisoMap.put("primeraFoto", primeraFoto.map(Foto::getRutaArchivo).orElse(null));

            return avisoMap;
        }).collect(Collectors.toList());
    }


    // Metodo para obtener aviso y que muestre toda la informacion
    public Map<String, Object> getAvisosPaginados(int page, int perPage) {
        Pageable pageable = PageRequest.of(page - 1, perPage);
        Page<AvisoAdopcion> avisoPage = avisoRepository.findAllByOrderByFechaIngresoDesc(pageable);
        List<Map<String, Object>> avisos = avisoPage.getContent().stream().map(aviso -> {
            Map<String, Object> avisoMap = new HashMap<>();
            avisoMap.put("id", aviso.getId());
            avisoMap.put("fechaIngreso", aviso.getFechaIngreso());
            avisoMap.put("fechaEntrega", aviso.getFechaEntrega());
            avisoMap.put("comuna", aviso.getComuna().getNombre());
            avisoMap.put("sector", aviso.getSector());
            avisoMap.put("cantidad", aviso.getCantidad());
            avisoMap.put("tipo", aviso.getTipo().name());
            avisoMap.put("edad", aviso.getEdad());
            avisoMap.put("unidadMedida", aviso.getUnidadMedida().name());
            avisoMap.put("nombreContacto", aviso.getNombre());
            avisoMap.put("totalFotos", aviso.getFotos() != null ? aviso.getFotos().size() : 0);

            return avisoMap;
        }).collect(Collectors.toList());

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("avisos", avisos);
        resultado.put("totalPages", avisoPage.getTotalPages());

        return resultado;
    }

    // Obtiene la info de un anuncio y lo muestra en detalle (es decir, cuando es seleccionado).
    public Map<String, Object> getAvisoDetalle(Integer avisoId) {
        Optional<AvisoAdopcion> avisoOpt = avisoRepository.findById(avisoId);

        if (avisoOpt.isEmpty()) {
            return null;
        }

        AvisoAdopcion aviso = avisoOpt.get();
        Map<String, Object> detalle = new HashMap<>();

        // Informacion
        detalle.put("id", aviso.getId());
        detalle.put("fechaIngreso", aviso.getFechaIngreso());
        detalle.put("fechaEntrega", aviso.getFechaEntrega());
        detalle.put("comuna", aviso.getComuna().getNombre());
        detalle.put("region", aviso.getComuna().getRegion().getNombre());
        detalle.put("sector", aviso.getSector());
        detalle.put("nombre", aviso.getNombre());
        detalle.put("email", aviso.getEmail());
        detalle.put("celular", aviso.getCelular());
        detalle.put("tipo", aviso.getTipo().name());
        detalle.put("cantidad", aviso.getCantidad());
        detalle.put("edad", aviso.getEdad());
        detalle.put("unidadMedida", aviso.getUnidadMedida().name());
        detalle.put("descripcion", aviso.getDescripcion());

        // Fotos
        List<Map<String, String>> fotos = aviso.getFotos().stream().map(foto -> {
            Map<String, String> fotoMap = new HashMap<>();
            fotoMap.put("rutaArchivo", foto.getRutaArchivo());
            fotoMap.put("nombreArchivo", foto.getNombreArchivo());
            return fotoMap;
        }).collect(Collectors.toList());
        detalle.put("fotos", fotos);

        // Redes sociales
        List<Map<String, String>> redes = aviso.getRedes().stream().map(red -> {
            Map<String, String> redMap = new HashMap<>();
            redMap.put("redSocial", red.getNombre().name());
            redMap.put("identificador", red.getIdentificador());
            return redMap;
        }).collect(Collectors.toList());
        detalle.put("redes", redes);

        return detalle;
    }


    // Crear aviso de adopcion
    @Transactional
    public Integer crearAviso(Map<String, Object> datosAviso, List<MultipartFile> fotos) throws IOException {
        // Buscar comuna
        String nombreRegion = (String) datosAviso.get("region");
        String nombreComuna = (String) datosAviso.get("comuna");
        Optional<Comuna> comunaOpt = comunaRepository.findByNombre(nombreComuna);

        if (comunaOpt.isEmpty()) {
            return null;
        }

        // Crear aviso con info otorgada.
        AvisoAdopcion aviso = new AvisoAdopcion();
        aviso.setFechaIngreso(LocalDateTime.now());
        aviso.setRegion(nombreRegion);
        aviso.setComuna(comunaOpt.get());
        aviso.setSector((String) datosAviso.get("sector"));
        aviso.setNombre((String) datosAviso.get("nombre"));
        aviso.setEmail((String) datosAviso.get("email"));
        aviso.setCelular((String) datosAviso.get("celular"));
        aviso.setTipo(AvisoAdopcion.TipoMascota.valueOf((String) datosAviso.get("tipo")));
        aviso.setCantidad(Integer.parseInt(datosAviso.get("cantidad").toString()));
        aviso.setEdad(Integer.parseInt(datosAviso.get("edad").toString()));

        String unidad = (String) datosAviso.get("unidad");
        aviso.setUnidadMedida("años".equals(unidad) ? AvisoAdopcion.UnidadMedida.a : AvisoAdopcion.UnidadMedida.m);

        aviso.setFechaEntrega((LocalDateTime) datosAviso.get("fechaEntrega"));
        aviso.setDescripcion((String) datosAviso.get("descripcion"));

        // Guardar aviso
        aviso = avisoRepository.save(aviso);

        // Guardar red social si existe
        if (datosAviso.containsKey("red") && datosAviso.containsKey("redId")) {
            ContactarPor red = new ContactarPor();
            red.setNombre(ContactarPor.RedSocial.valueOf((String) datosAviso.get("red")));
            red.setIdentificador((String) datosAviso.get("redId"));
            red.setAviso(aviso);
            contactarPorRepository.save(red);
        }

        // Guardar fotos
        if (fotos != null && !fotos.isEmpty()) {
            for (MultipartFile file : fotos) {
                if (!file.isEmpty()) {
                    String filename = saveFile(file);

                    Foto foto = new Foto();
                    foto.setRutaArchivo("uploads/fotos/" + filename);
                    foto.setNombreArchivo(filename);
                    foto.setAviso(aviso);
                    fotoRepository.save(foto);
                }
            }
        }

        return aviso.getId();
    }

    // Guardar archivos
    private String saveFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String filename = System.currentTimeMillis() + "_" + originalFilename;

        Path uploadPath = Paths.get(directorioSubida);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath);

        return filename;
    }

    // validar tipo de archivos
    public boolean isAllowedFile(String filename) {
        if (filename == null || !filename.contains(".")) {
            return false;
        }
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        return archivosValidos.contains(extension);
    }






}