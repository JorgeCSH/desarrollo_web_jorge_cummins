# database/db.py
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from datetime import datetime

# --- Configuración conexión ---
DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# --- Modelos ---

class Region(Base):
    __tablename__ = "region"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    comunas = relationship("Comuna", back_populates="region")

class Comuna(Base):
    __tablename__ = "comuna"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    region_id = Column(Integer, ForeignKey("region.id"))
    region = relationship("Region", back_populates="comunas")

class AvisoAdopcion(Base):
    __tablename__ = "aviso_adopcion"
    id = Column(Integer, primary_key=True)
    region = Column(String(100), nullable=False)
    comuna = Column(String(100), nullable=False)
    sector = Column(String(100))
    nombre_contacto = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    telefono = Column(String(30))
    tipo = Column(String(50), nullable=False)
    cantidad = Column(Integer, nullable=False)
    edad = Column(String(50), nullable=False)
    unidad = Column(String(20), nullable=False)
    descripcion = Column(Text)
    fecha_disponible = Column(DateTime)
    fecha_publicacion = Column(DateTime, default=datetime.utcnow)

    contactos = relationship("ContactarPor", back_populates="aviso", cascade="all, delete")
    fotos = relationship("Foto", back_populates="aviso", cascade="all, delete")

class ContactarPor(Base):
    __tablename__ = "contactar_por"
    id = Column(Integer, primary_key=True)
    aviso_id = Column(Integer, ForeignKey("aviso_adopcion.id"))
    red = Column(String(50), nullable=False)
    red_id = Column(String(100))
    aviso = relationship("AvisoAdopcion", back_populates="contactos")

class Foto(Base):
    __tablename__ = "foto"
    id = Column(Integer, primary_key=True)
    aviso_id = Column(Integer, ForeignKey("aviso_adopcion.id"))
    nombre_archivo = Column(String(255), nullable=False)
    aviso = relationship("AvisoAdopcion", back_populates="fotos")

# --- Funciones auxiliares ---
def get_session():
    return SessionLocal()

def get_ultimos_avisos(limit=5):
    session = get_session()
    avisos = session.query(AvisoAdopcion).order_by(AvisoAdopcion.fecha_publicacion.desc()).limit(limit).all()
    session.close()
    return avisos

def get_todos_avisos():
    session = get_session()
    avisos = session.query(AvisoAdopcion).order_by(AvisoAdopcion.fecha_publicacion.desc()).all()
    session.close()
    return avisos

def crear_aviso(data, fotos, contactos):
    session = get_session()
    aviso = AvisoAdopcion(**data)
    session.add(aviso)
    session.commit()

    for f in fotos:
        session.add(Foto(aviso_id=aviso.id, nombre_archivo=f))
    for c in contactos:
        session.add(ContactarPor(aviso_id=aviso.id, red=c["red"], red_id=c.get("red_id")))

    session.commit()
    session.close()
    return aviso
