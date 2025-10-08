from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, Enum, ForeignKey, func
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
import json
import os

# Configuración de la base de datos
DB_NAME = "tarea2"
DB_USERNAME = 'cc5002'
DB_PASSWORD = 'programacionweb'
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


# --- Models ---

class Region(Base):
    __tablename__ = 'region'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)

    comunas = relationship("Comuna", back_populates="region")


class Comuna(Base):
    __tablename__ = 'comuna'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(Integer, ForeignKey('region.id'), nullable=False)

    region = relationship("Region", back_populates="comunas")
    avisos = relationship("AvisoAdopcion", back_populates="comuna")


class AvisoAdopcion(Base):
    __tablename__ = 'aviso_adopcion'

    id = Column(Integer, primary_key=True, autoincrement=True)
    fecha_ingreso = Column(DateTime, nullable=False)
    comuna_id = Column(Integer, ForeignKey('comuna.id'), nullable=False)
    sector = Column(String(100))
    nombre = Column(String(200), nullable=False)
    email = Column(String(100), nullable=False)
    celular = Column(String(15))
    tipo = Column(Enum('gato', 'perro'), nullable=False)
    cantidad = Column(Integer, nullable=False)
    edad = Column(Integer, nullable=False)
    unidad_medida = Column(Enum('a', 'm'), nullable=False)
    fecha_entrega = Column(DateTime, nullable=False)
    descripcion = Column(Text(500))

    comuna = relationship("Comuna", back_populates="avisos")
    fotos = relationship("Foto", back_populates="aviso", cascade="all, delete")
    redes = relationship("ContactarPor", back_populates="aviso", cascade="all, delete")


class Foto(Base):
    __tablename__ = 'foto'

    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    aviso_id = Column(Integer, ForeignKey('aviso_adopcion.id'), nullable=False)

    aviso = relationship("AvisoAdopcion", back_populates="fotos")


class ContactarPor(Base):
    __tablename__ = 'contactar_por'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra'), nullable=False)
    identificador = Column(String(150), nullable=False)
    aviso_id = Column(Integer, ForeignKey('aviso_adopcion.id'), nullable=False)

    aviso = relationship("AvisoAdopcion", back_populates="redes")


# --- Database Functions ---

def get_ultimos_avisos(limite=5):
    """Obtiene los últimos N avisos de adopción"""
    session = SessionLocal()

    avisos = session.query(
        AvisoAdopcion.id,
        AvisoAdopcion.fecha_ingreso,
        Comuna.nombre.label('comuna'),
        AvisoAdopcion.sector,
        AvisoAdopcion.cantidad,
        AvisoAdopcion.tipo,
        AvisoAdopcion.edad,
        AvisoAdopcion.unidad_medida
    ).join(Comuna).order_by(AvisoAdopcion.fecha_ingreso.desc()).limit(limite).all()

    # Agregar primera foto a cada aviso
    resultado = []
    for aviso in avisos:
        aviso_dict = {
            'id': aviso.id,
            'fecha_ingreso': aviso.fecha_ingreso,
            'comuna': aviso.comuna,
            'sector': aviso.sector,
            'cantidad': aviso.cantidad,
            'tipo': aviso.tipo,
            'edad': aviso.edad,
            'unidad_medida': aviso.unidad_medida,
            'primera_foto': None
        }

        primera_foto = session.query(Foto.ruta_archivo).filter_by(aviso_id=aviso.id).first()
        if primera_foto:
            aviso_dict['primera_foto'] = primera_foto[0]

        resultado.append(aviso_dict)

    session.close()
    return resultado


def get_avisos_paginados(page=1, per_page=5):
    """Obtiene avisos de adopción con paginación"""
    session = SessionLocal()
    offset = (page - 1) * per_page

    # Contar total
    total = session.query(AvisoAdopcion).count()
    total_pages = (total + per_page - 1) // per_page

    # Obtener avisos
    avisos = session.query(
        AvisoAdopcion.id,
        AvisoAdopcion.fecha_ingreso,
        AvisoAdopcion.fecha_entrega,
        Comuna.nombre.label('comuna'),
        AvisoAdopcion.sector,
        AvisoAdopcion.cantidad,
        AvisoAdopcion.tipo,
        AvisoAdopcion.edad,
        AvisoAdopcion.unidad_medida,
        AvisoAdopcion.nombre.label('nombre_contacto'),
        func.count(Foto.id).label('total_fotos')
    ).join(Comuna).outerjoin(Foto).group_by(AvisoAdopcion.id).order_by(
        AvisoAdopcion.fecha_ingreso.desc()
    ).limit(per_page).offset(offset).all()

    resultado = []
    for aviso in avisos:
        resultado.append({
            'id': aviso.id,
            'fecha_ingreso': aviso.fecha_ingreso,
            'fecha_entrega': aviso.fecha_entrega,
            'comuna': aviso.comuna,
            'sector': aviso.sector,
            'cantidad': aviso.cantidad,
            'tipo': aviso.tipo,
            'edad': aviso.edad,
            'unidad_medida': aviso.unidad_medida,
            'nombre_contacto': aviso.nombre_contacto,
            'total_fotos': aviso.total_fotos
        })

    session.close()
    return resultado, total_pages


def get_aviso_detalle(aviso_id):
    """Obtiene el detalle completo de un aviso"""
    session = SessionLocal()

    aviso = session.query(AvisoAdopcion).filter_by(id=aviso_id).first()

    if not aviso:
        session.close()
        return None

    # Construir diccionario con toda la información
    aviso_dict = {
        'id': aviso.id,
        'fecha_ingreso': aviso.fecha_ingreso,
        'fecha_entrega': aviso.fecha_entrega,
        'comuna': aviso.comuna.nombre,
        'region': aviso.comuna.region.nombre,
        'sector': aviso.sector,
        'nombre': aviso.nombre,
        'email': aviso.email,
        'celular': aviso.celular,
        'tipo': aviso.tipo,
        'cantidad': aviso.cantidad,
        'edad': aviso.edad,
        'unidad_medida': aviso.unidad_medida,
        'descripcion': aviso.descripcion,
        'fotos': [],
        'redes': []
    }

    # Agregar fotos
    for foto in aviso.fotos:
        aviso_dict['fotos'].append({
            'ruta_archivo': foto.ruta_archivo,
            'nombre_archivo': foto.nombre_archivo
        })

    # Agregar redes sociales
    for red in aviso.redes:
        aviso_dict['redes'].append({
            'red_social': red.nombre,
            'identificador': red.identificador
        })

    session.close()
    return aviso_dict


def get_comuna_by_nombre(nombre):
    """Obtiene una comuna por su nombre"""
    session = SessionLocal()
    comuna = session.query(Comuna).filter_by(nombre=nombre).first()
    session.close()
    return comuna


def crear_aviso(datos_aviso):
    """
    Crea un nuevo aviso de adopción

    Args:
        datos_aviso: dict con los campos del aviso

    Returns:
        int: ID del aviso creado, o None si hay error
    """
    session = SessionLocal()

    # Verificar que existe la comuna
    comuna = session.query(Comuna).filter_by(nombre=datos_aviso['comuna']).first()
    if not comuna:
        session.close()
        return None

    # Convertir unidad a 'a' o 'm'
    unidad = 'a' if datos_aviso['unidad'] == 'años' else 'm'

    # Crear aviso
    nuevo_aviso = AvisoAdopcion(
        fecha_ingreso=func.now(),
        comuna_id=comuna.id,
        sector=datos_aviso.get('sector', ''),
        nombre=datos_aviso['nombre'],
        email=datos_aviso['email'],
        celular=datos_aviso.get('celular', ''),
        tipo=datos_aviso['tipo'],
        cantidad=int(datos_aviso['cantidad']),
        edad=int(datos_aviso['edad']),
        unidad_medida=unidad,
        fecha_entrega=datos_aviso['fecha_entrega'],
        descripcion=datos_aviso.get('descripcion', '')
    )

    session.add(nuevo_aviso)
    session.commit()

    aviso_id = nuevo_aviso.id
    session.close()

    return aviso_id


def crear_foto(aviso_id, ruta_archivo, nombre_archivo):
    """Crea una nueva foto asociada a un aviso"""
    session = SessionLocal()

    nueva_foto = Foto(
        ruta_archivo=ruta_archivo,
        nombre_archivo=nombre_archivo,
        aviso_id=aviso_id
    )

    session.add(nueva_foto)
    session.commit()
    session.close()


def crear_red_social(aviso_id, nombre_red, identificador):
    """Crea una nueva red social de contacto"""
    session = SessionLocal()

    nueva_red = ContactarPor(
        nombre=nombre_red,
        identificador=identificador,
        aviso_id=aviso_id
    )

    session.add(nueva_red)
    session.commit()
    session.close()