import React, { useState, useEffect } from "react";
import {SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert, Image, ActivityIndicator} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function HomeAlumnoScreen({ navigation, route }) {
  const { user } = route.params || { name: "Usuario", role: "alumno" };
  const [refreshing, setRefreshing] = useState(false);
  

  // Datos de ejemplo con imágenes
  const [dashboardData, setDashboardData] = useState({
    promedio: 8.5,
    asistencias: 92,
    materias: [
      {
        id: 1,
        nombre: "Matemáticas",
        profesor: "Dr. García",
        icon: "calculator",
        color: "#FF6B6B",
        codigo: "MAT101",
        horario: "Lunes 8:00-10:00, Miércoles 9:00-11:00",
        aula: "Aula 301",
      },
      {
        id: 2,
        nombre: "Programación",
        profesor: "Ing. Rodríguez",
        icon: "code-braces",
        color: "#4ECDC4",
        codigo: "PROG201",
        horario: "Martes 10:00-12:00, Jueves 14:00-16:00",
        aula: "Laboratorio 105",
      },
      {
        id: 3,
        nombre: "Física",
        profesor: "Dra. Martínez",
        icon: "atom",
        color: "#45B7D1",
        codigo: "FIS101",
        horario: "Lunes 11:00-13:00, Viernes 8:00-10:00",
        aula: "Aula 204",
      },
      {
        id: 4,
        nombre: "Historia",
        profesor: "Mtro. López",
        icon: "book-open",
        color: "#96CEB4",
        codigo: "HIS201",
        horario: "Miércoles 14:00-16:00, Jueves 10:00-12:00",
        aula: "Aula 102",
      },
    ],
    calificaciones: [
      { materia: "Matemáticas", calificacion: 9.0, fecha: "15/03/2024", tendencia: "up", materiaId: 1 },
      { materia: "Programación", calificacion: 8.5, fecha: "20/03/2024", tendencia: "up", materiaId: 2 },
      { materia: "Física", calificacion: 7.8, fecha: "18/03/2024", tendencia: "down", materiaId: 3 },
      { materia: "Historia", calificacion: 9.2, fecha: "22/03/2024", tendencia: "up", materiaId: 4 },
    ],
    avisos: [
      {
        id: 1,
        titulo: "Suspensión de clases",
        contenido: "Mañana no hay clases por mantenimiento",
        tipo: "urgente",
        fecha: "Hoy 10:30 AM",
      },
      {
        id: 2,
        titulo: "Entrega de proyectos",
        contenido: "Fecha límite para proyecto final: 30 de marzo",
        tipo: "académico",
        fecha: "Ayer 15:45 PM",
      },
      {
        id: 3,
        titulo: "Concurso de programación",
        contenido: "Inscripciones abiertas hasta el 25 de marzo",
        tipo: "evento",
        fecha: "23/03/2024",
      },
    ],
  });

  const loadDashboardData = () => {
    console.log("Cargando datos...");
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("Actualizado", "Datos actualizados correctamente");
    }, 1500);
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres salir?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, salir",
          style: "destructive",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ]
    );
  };

  // Navegar a pantalla de perfil
  const navigateToProfile = () => {
    navigation.navigate('PerfilAlumno', { 
      userData: user,
      promedio: dashboardData.promedio,
      asistencias: dashboardData.asistencias
    });
  };

  // Navegar a pantalla de calificaciones
  const navigateToCalificaciones = (materia = null) => {
    if (materia) {
      // Filtrar calificaciones de la materia específica
      const calificacionesMateria = dashboardData.calificaciones.filter(
        cal => cal.materiaId === materia.id
      );
      
      navigation.navigate('Calificaciones', { 
        materia: materia,
        calificaciones: calificacionesMateria,
        promedioGeneral: dashboardData.promedio
      });
    } else {
      navigation.navigate('Calificaciones', { 
        todasCalificaciones: dashboardData.calificaciones,
        promedioGeneral: dashboardData.promedio,
        materias: dashboardData.materias
      });
    }
  };

  // Navegar a pantalla de horario
  const navigateToHorario = (materia = null) => {
    if (materia) {
      navigation.navigate('Horario', { 
        materiaEspecifica: materia,
        todasMaterias: dashboardData.materias
      });
    } else {
      navigation.navigate('Horario', { 
        todasMaterias: dashboardData.materias,
        user: user
      });
    }
  };

  // Navegar a pantalla de asistencias
  const navigateToAsistencias = () => {
    navigation.navigate('Asistencias', { 
      user: user,
      promedioAsistencia: dashboardData.asistencias
    });
  };

  // Navegar a pantalla de materias
  const navigateToMaterias = () => {
    navigation.navigate('Materias', { 
      materias: dashboardData.materias,
      user: user
    });
  };

  // Navegar a pantalla de ajustes
  const navigateToAjustes = () => {
    navigation.navigate('Ajustes', { 
      user: user
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.userInfo}
        onPress={navigateToProfile}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="account-school" size={32} color="#fff" />
          </View>
          {user.role === "alumno" && (
            <View style={styles.roleBadge}>
              <Icon name="school" size={12} color="#fff" />
            </View>
          )}
        </View>

        <View style={styles.userDetails}>
          <Text style={styles.welcomeText}>¡Hola de nuevo!</Text>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.userRoleContainer}>
            <Icon
              name={user.role === "alumno" ? "school" : "teach"}
              size={14}
              color="#666"
            />
            <Text style={styles.userRole}>
              {user.role === "alumno" ? "Estudiante" : "Profesor"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      {/* PROMEDIO - Enlace a Calificaciones */}
      <TouchableOpacity 
        style={[styles.statCard, { backgroundColor: "#E8F5E9" }]}
        onPress={() => navigateToCalificaciones()}
        activeOpacity={0.8}
      >
        <View style={styles.statIconContainer}>
          <Icon name="chart-line" size={28} color="#4CAF50" />
        </View>
        <Text style={styles.statValue}>{dashboardData.promedio.toFixed(1)}</Text>
        <Text style={styles.statLabel}>Promedio</Text>
        <Text style={styles.statTrend}>+0.3 este mes</Text>
      </TouchableOpacity>

      {/* ASISTENCIA - Enlace a AsistenciasScreen */}
      <TouchableOpacity 
        style={[styles.statCard, { backgroundColor: "#E3F2FD" }]}
        onPress={navigateToAsistencias}  // ← CAMBIO AQUÍ
        activeOpacity={0.8}
      >
        <View style={styles.statIconContainer}>
          <Icon name="calendar-check" size={28} color="#2196F3" />
        </View>
        <Text style={styles.statValue}>{dashboardData.asistencias}%</Text>
        <Text style={styles.statLabel}>Asistencia</Text>
        <Text style={styles.statTrend}>Excelente</Text>
      </TouchableOpacity>

      {/* MATERIAS - Enlace a MateriasScreen */}
      <TouchableOpacity 
        style={[styles.statCard, { backgroundColor: "#FFF3E0" }]}
        onPress={navigateToMaterias}  // ← CAMBIO AQUÍ
        activeOpacity={0.8}
      >
        <View style={styles.statIconContainer}>
          <Icon name="book-open-variant" size={28} color="#FF9800" />
        </View>
        <Text style={styles.statValue}>{dashboardData.materias.length}</Text>
        <Text style={styles.statLabel}>Materias</Text>
        <Text style={styles.statTrend}>4 activas</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMaterias = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mis Materias</Text>
        {/* VER HORARIO COMPLETO - Enlace a HorarioScreen */}
        <TouchableOpacity onPress={() => navigateToHorario()}>
          <Text style={styles.seeAll}>Ver horario completo</Text>
        </TouchableOpacity>
      </View>

      {dashboardData.materias.map((materia) => (
        <TouchableOpacity 
          key={materia.id} 
          style={styles.materiaItem}
          onPress={() => navigateToHorario(materia)}  // Ver horario de esta materia
          activeOpacity={0.7}
        >
          <View style={[styles.materiaIcon, { backgroundColor: materia.color }]}>
            <Icon name={materia.icon} size={22} color="#fff" />
          </View>
          <View style={styles.materiaInfo}>
            <Text style={styles.materiaNombre}>{materia.nombre}</Text>
            <Text style={styles.materiaProfesor}>{materia.profesor}</Text>
            <Text style={styles.materiaCodigo}>{materia.codigo} • {materia.aula}</Text>
          </View>
          <View style={styles.materiaActions}>
            {/* Ver calificaciones de esta materia */}
            <TouchableOpacity 
              style={styles.materiaActionButton}
              onPress={(e) => {
                e.stopPropagation();
                navigateToCalificaciones(materia);
              }}
            >
              <Icon name="chart-box" size={20} color="#4CAF50" />
            </TouchableOpacity>
            {/* Ver horario de esta materia */}
            <TouchableOpacity 
              style={styles.materiaActionButton}
              onPress={(e) => {
                e.stopPropagation();
                navigateToHorario(materia);
              }}
            >
              <Icon name="clock-outline" size={20} color="#2196F3" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCalificaciones = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Calificaciones Recientes</Text>
        {/* VER HISTORIAL COMPLETO - Enlace a CalificacionesScreen completo */}
        <TouchableOpacity onPress={() => navigateToCalificaciones()}>
          <Text style={styles.seeAll}>Ver historial completo</Text>
        </TouchableOpacity>
      </View>

      {dashboardData.calificaciones.map((cal, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.calificacionItem}
          onPress={() => {
            const materia = dashboardData.materias.find(m => m.id === cal.materiaId);
            if (materia) navigateToCalificaciones(materia);
          }}
          activeOpacity={0.7}
        >
          <View style={styles.calLeft}>
            <Icon name="file-document" size={20} color="#666" />
            <Text style={styles.calMateria}>{cal.materia}</Text>
          </View>
          <View style={styles.calRight}>
            <View style={styles.calNotaContainer}>
              <Text style={styles.calNota}>{cal.calificacion.toFixed(1)}</Text>
              <Icon
                name={cal.tendencia === "up" ? "trending-up" : "trending-down"}
                size={16}
                color={cal.tendencia === "up" ? "#4CAF50" : "#F44336"}
              />
            </View>
            <Text style={styles.calFecha}>{cal.fecha}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAvisos = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Avisos Recientes</Text>
        <TouchableOpacity>
          <Icon name="bell-outline" size={22} color="#666" />
        </TouchableOpacity>
      </View>

      {dashboardData.avisos.map((aviso) => (
        <TouchableOpacity 
          key={aviso.id} 
          style={styles.avisoCard}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.avisoIcon,
              {
                backgroundColor:
                  aviso.tipo === "urgente"
                    ? "#FFEBEE"
                    : aviso.tipo === "académico"
                    ? "#E8F5E9"
                    : "#E3F2FD",
              },
            ]}
          >
            <Icon
              name={
                aviso.tipo === "urgente"
                  ? "alert"
                  : aviso.tipo === "académico"
                  ? "book"
                  : "calendar-star"
              }
              size={20}
              color={
                aviso.tipo === "urgente"
                  ? "#F44336"
                  : aviso.tipo === "académico"
                  ? "#4CAF50"
                  : "#2196F3"
              }
            />
          </View>
          <View style={styles.avisoContent}>
            <Text style={styles.avisoTitulo}>{aviso.titulo}</Text>
            <Text style={styles.avisoContenido}>{aviso.contenido}</Text>
            <Text style={styles.avisoFecha}>{aviso.fecha}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <Text style={styles.quickActionsTitle}>Acciones Rápidas</Text>
      <View style={styles.actionsGrid}>
        {/* HORARIO - Enlace a HorarioScreen */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigateToHorario()}
          activeOpacity={0.7}
        >
          <View style={[styles.actionIcon, { backgroundColor: "#FFE0B2" }]}>
            <Icon name="calendar-clock" size={24} color="#FF9800" />
          </View>
          <Text style={styles.actionText}>Horario</Text>
        </TouchableOpacity>

        {/* CALIFICACIONES - Enlace a CalificacionesScreen */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigateToCalificaciones()}
          activeOpacity={0.7}
        >
          <View style={[styles.actionIcon, { backgroundColor: "#C8E6C9" }]}>
            <Icon name="file-document-multiple" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.actionText}>Calificaciones</Text>
        </TouchableOpacity>

        {/* PERFIL - Enlace a PerfilAlumnoScreen */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={navigateToProfile}
          activeOpacity={0.7}
        >
          <View style={[styles.actionIcon, { backgroundColor: "#BBDEFB" }]}>
            <Icon name="account" size={24} color="#2196F3" />
          </View>
          <Text style={styles.actionText}>Perfil</Text>
        </TouchableOpacity>

        {/* AJUSTES - Enlace a AjustesScreen */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={navigateToAjustes}  // ← CAMBIO AQUÍ
          activeOpacity={0.7}
        >
          <View style={[styles.actionIcon, { backgroundColor: "#E1BEE7" }]}>
            <Icon name="cog" size={24} color="#9C27B0" />
          </View>
          <Text style={styles.actionText}>Ajustes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
        {renderStats()}
        {renderMaterias()}
        {renderCalificaciones()}
        {renderAvisos()}
        {renderQuickActions()}

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Icon name="school" size={40} color="#E0E0E0" />
            <Text style={styles.footerText}>Sistema Escolar v2.0</Text>
            <Text style={styles.footerSubtext}>© 2024 - Todos los derechos reservados</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Los estilos se mantienen igual...
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  roleBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userDetails: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 12,
    color: "#757575",
    fontWeight: "500",
    marginBottom: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 4,
  },
  userRoleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userRole: {
    fontSize: 13,
    color: "#757575",
    marginLeft: 5,
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFEBEE",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#757575",
    fontWeight: "500",
    marginBottom: 4,
  },
  statTrend: {
    fontSize: 10,
    color: "#9E9E9E",
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
  },
  seeAll: {
    fontSize: 14,
    color: "#2196F3",
    fontWeight: "500",
  },
  materiaItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  materiaIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  materiaInfo: {
    flex: 1,
  },
  materiaNombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 2,
  },
  materiaProfesor: {
    fontSize: 13,
    color: "#757575",
    marginBottom: 2,
  },
  materiaCodigo: {
    fontSize: 11,
    color: "#9E9E9E",
  },
  materiaActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  materiaActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  calificacionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  calLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  calMateria: {
    fontSize: 15,
    color: "#212121",
    marginLeft: 10,
  },
  calRight: {
    alignItems: "flex-end",
  },
  calNotaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  calNota: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginRight: 6,
  },
  calFecha: {
    fontSize: 12,
    color: "#9E9E9E",
    marginTop: 2,
  },
  avisoCard: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  avisoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avisoContent: {
    flex: 1,
  },
  avisoTitulo: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 4,
  },
  avisoContenido: {
    fontSize: 13,
    color: "#616161",
    lineHeight: 18,
    marginBottom: 6,
  },
  avisoFecha: {
    fontSize: 11,
    color: "#9E9E9E",
  },
  quickActions: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
    width: "23%",
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: "#616161",
    textAlign: "center",
  },
  footer: {
    marginTop: 30,
    paddingVertical: 25,
    alignItems: "center",
  },
  footerContent: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#9E9E9E",
    fontWeight: "500",
    marginTop: 10,
  },
  footerSubtext: {
    fontSize: 11,
    color: "#BDBDBD",
    marginTop: 5,
  },
});