using AutoMapper;
using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.API
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Region
            CreateMap<Region, RegionDTO>();
            CreateMap<RegionCreateDTO, Region>();
            CreateMap<RegionUpdateDTO, Region>();

            // Sucursal
            CreateMap<Sucursal, SucursalDTO>()
                .ForMember(dest => dest.NombreRegion, opt => opt.MapFrom(src => src.Region.Nombre));
            CreateMap<SucursalCreateDTO, Sucursal>();
            CreateMap<SucursalUpdateDTO, Sucursal>();

            // Rol
            CreateMap<Rol, RolDTO>();
            CreateMap<RolCreateDTO, Rol>();
            CreateMap<RolUpdateDTO, Rol>();

            // Departamento
            CreateMap<Departamento, DepartamentoDTO>();
            CreateMap<DepartamentoCreateDTO, Departamento>();
            CreateMap<DepartamentoUpdateDTO, Departamento>();

            // Cargo
            CreateMap<Cargo, CargoDTO>()
                .ForMember(dest => dest.NombreDepartamento, opt => opt.MapFrom(src => src.Departamento.Nombre));
            CreateMap<CargoCreateDTO, Cargo>();
            CreateMap<CargoUpdateDTO, Cargo>();

            // Usuario
            CreateMap<Usuario, UsuarioDTO>()
                .ForMember(dest => dest.NombreRol, opt => opt.MapFrom(src => src.Rol.Nombre))
                .ForMember(dest => dest.NombreSucursal, opt => opt.MapFrom(src => src.Sucursal.Nombre));
            CreateMap<UsuarioCreateDTO, Usuario>();
            CreateMap<UsuarioUpdateDTO, Usuario>();

            // Empleado
            CreateMap<Empleado, EmpleadoDTO>()
                .ForMember(dest => dest.NombreCargo, opt => opt.MapFrom(src => src.Cargo.Nombre))
                .ForMember(dest => dest.NombreSucursal, opt => opt.MapFrom(src => src.Sucursal.Nombre))
                .ForMember(dest => dest.NombreRegion, opt => opt.MapFrom(src => src.Sucursal.Region.Nombre))
                .ForMember(dest => dest.NombreUsuarioCreador, opt => opt.MapFrom(src =>
                    src.UsuarioCreador != null ? $"{src.UsuarioCreador.Nombre} {src.UsuarioCreador.Apellido}" : null));
            CreateMap<EmpleadoCreateDTO, Empleado>();
            CreateMap<EmpleadoUpdateDTO, Empleado>();

            // Horario
            CreateMap<Horario, HorarioDTO>();
            CreateMap<HorarioCreateDTO, Horario>();
            CreateMap<HorarioUpdateDTO, Horario>();

            // Asistencia
            CreateMap<Asistencia, AsistenciaDTO>()
                .ForMember(dest => dest.NombreEmpleado, opt => opt.MapFrom(src => $"{src.Empleado.Nombre} {src.Empleado.Apellido}"))
                .ForMember(dest => dest.CedulaEmpleado, opt => opt.MapFrom(src => src.Empleado.Cedula))
                .ForMember(dest => dest.CargoEmpleado, opt => opt.MapFrom(src => src.Empleado.Cargo.Nombre))
                .ForMember(dest => dest.SucursalEmpleado, opt => opt.MapFrom(src => src.Empleado.Sucursal.Nombre));

            // DiaNoLaborable
            CreateMap<DiaNoLaborable, DiaNoLaborableDTO>()
                .ForMember(dest => dest.NombreSucursal, opt => opt.MapFrom(src => src.Sucursal.Nombre))
                .ForMember(dest => dest.NombreUsuarioCreador, opt => opt.MapFrom(src =>
                    src.UsuarioCreador != null ? $"{src.UsuarioCreador.Nombre} {src.UsuarioCreador.Apellido}" : null));
            CreateMap<DiaNoLaborableCreateDTO, DiaNoLaborable>();
            CreateMap<DiaNoLaborableUpdateDTO, DiaNoLaborable>();

            // HorarioEmpleado
            CreateMap<HorarioEmpleado, HorarioEmpleadoDTO>()
                .ForMember(dest => dest.NombreEmpleado, opt => opt.MapFrom(src => $"{src.Empleado.Nombre} {src.Empleado.Apellido}"))
                .ForMember(dest => dest.CedulaEmpleado, opt => opt.MapFrom(src => src.Empleado.Cedula))
                .ForMember(dest => dest.NombreHorario, opt => opt.MapFrom(src => src.Horario.Nombre))
                .ForMember(dest => dest.HoraEntrada, opt => opt.MapFrom(src => src.Horario.HoraEntrada.ToString(@"hh\:mm")))
                .ForMember(dest => dest.HoraSalida, opt => opt.MapFrom(src => src.Horario.HoraSalida.ToString(@"hh\:mm")))
                .ForMember(dest => dest.NombreUsuarioCreador, opt => opt.MapFrom(src =>
                    src.UsuarioCreador != null ? $"{src.UsuarioCreador.Nombre} {src.UsuarioCreador.Apellido}" : null));
            CreateMap<HorarioEmpleadoCreateDTO, HorarioEmpleado>();
            CreateMap<HorarioEmpleadoUpdateDTO, HorarioEmpleado>();

            // TipoPermiso
            CreateMap<TipoPermiso, TipoPermisoDTO>();
            CreateMap<TipoPermisoCreateDTO, TipoPermiso>();
            CreateMap<TipoPermisoUpdateDTO, TipoPermiso>();

            // Permiso
            CreateMap<Permiso, PermisoDTO>()
                .ForMember(dest => dest.NombreEmpleado, opt => opt.MapFrom(src => $"{src.Empleado.Nombre} {src.Empleado.Apellido}"))
                .ForMember(dest => dest.CedulaEmpleado, opt => opt.MapFrom(src => src.Empleado.Cedula))
                .ForMember(dest => dest.NombreTipoPermiso, opt => opt.MapFrom(src => src.TipoPermiso.Nombre))
                .ForMember(dest => dest.NombreUsuarioCreador, opt => opt.MapFrom(src =>
                    src.UsuarioCreador != null ? $"{src.UsuarioCreador.Nombre} {src.UsuarioCreador.Apellido}" : null));
            CreateMap<PermisoCreateDTO, Permiso>();
            CreateMap<PermisoUpdateDTO, Permiso>();

            // JustificacionAsistencia
            CreateMap<JustificacionAsistencia, JustificacionAsistenciaDTO>()
                .ForMember(dest => dest.EmpleadoID, opt => opt.MapFrom(src => src.Asistencia.EmpleadoID))
                .ForMember(dest => dest.NombreEmpleado, opt => opt.MapFrom(src =>
                    $"{src.Asistencia.Empleado.Nombre} {src.Asistencia.Empleado.Apellido}"))
                .ForMember(dest => dest.FechaAsistencia, opt => opt.MapFrom(src => src.Asistencia.Fecha))
                .ForMember(dest => dest.NombreUsuarioCreador, opt => opt.MapFrom(src =>
                    src.UsuarioCreador != null ? $"{src.UsuarioCreador.Nombre} {src.UsuarioCreador.Apellido}" : null));
            CreateMap<JustificacionAsistenciaCreateDTO, JustificacionAsistencia>();
            CreateMap<JustificacionAsistenciaUpdateDTO, JustificacionAsistencia>();
        }
    }
}