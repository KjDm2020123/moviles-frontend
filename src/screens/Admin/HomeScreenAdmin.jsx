import React, { useState, useEffect } from "react";
import {SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert, FlatList, Modal, TextInput, Platform } from "react-native";
import { useRoute } from '@react-navigation/native'; // Importamos useRoute
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function HomeScreenAdmin({ route, navigation }) { // Eliminamos route de los parámetros
  //const route = useRoute(); // Obtenemos route usando el hook
const user = route?.params?.user ?? {
  name: "Admin",
  role: "admin",
};
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  
  // Estadísticas del sistema
  const [stats, setStats] = useState({
    totalAlumnos: 1250,
    totalProfesores: 85,
    totalMaterias: 45,
    totalAvisos: 12,
    usuariosActivos: 342,
    calificacionesPendientes: 45,
  });

  // Acciones rápidas del admin
  const adminActions = [
    {
      id: 1,
      title: "Gestión de Usuarios",
      description: "Agregar, editar o eliminar usuarios",
      icon: "account-multiple",
      color: "#2196F3",
      screen: "GestionUsuarios",
    },
    {
      id: 2,
      title: "Gestión de Materias",
      description: "Administrar materias y planes de estudio",
      icon: "book-open-variant",
      color: "#4CAF50",
      screen: "GestionMaterias",
    },
    {
      id: 3,
      title: "Asignar Grupos",
      description: "Asignar alumnos a grupos y materias",
      icon: "account-group",
      color: "#FF9800",
      screen: "AsignarGrupos",
    },
    {
      id: 4,
      title: "Periodos Académicos",
      description: "Crear y gestionar periodos escolares",
      icon: "calendar-multiple",
      color: "#9C27B0",
      screen: "PeriodosAcademicos",
    },
    {
      id: 5,
      title: "Reportes del Sistema",
      description: "Generar reportes y estadísticas",
      icon: "chart-bar",
      color: "#607D8B",
      screen: "Reportes",
    },
    {
      id: 6,
      title: "Configuración",
      description: "Configurar parámetros del sistema",
      icon: "cog",
      color: "#795548",
      screen: "Configuracion",
    },
  ];

  // Actividad reciente
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: "Prof. García", action: "Registró calificaciones", time: "Hace 10 min", type: "calificacion" },
    { id: 2, user: "Admin", action: "Creó nuevo usuario", time: "Hace 30 min", type: "usuario" },
    { id: 3, user: "Sistema", action: "Backup automático", time: "Hace 2 horas", type: "sistema" },
    { id: 4, user: "Alumno Pérez", action: "Actualizó perfil", time: "Hace 3 horas", type: "perfil" },
  ]);

  // Alertas del sistema
  const [systemAlerts, setSystemAlerts] = useState([
    { id: 1, message: "5 calificaciones pendientes de aprobación", level: "warning" },
    { id: 2, message: "Backup programado para hoy a las 20:00", level: "info" },
    { id: 3, message: "3 usuarios con contraseña expirada", level: "danger" },
  ]);

  const loadDashboardData = () => {
    // Simular carga de datos
    console.log("Cargando datos de administrador...");
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("Actualizado", "Datos del sistema actualizados");
    }, 2000);
  };

  const handleQuickAction = (action) => {
    if (action.screen) {
      navigation.navigate(action.screen);
    } else {
      setSelectedAction(action);
      setModalVisible(true);
    }
  };

  // Función para manejar sombras de forma multiplataforma
  const getShadowStyle = (elevation = 3, shadowOpacity = 0.1, shadowRadius = 4) => {
    if (Platform.OS === 'web') {
      return {
        boxShadow: `0px 2px ${shadowRadius}px rgba(0,0,0,${shadowOpacity})`,
      };
    }
    return {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: shadowOpacity,
      shadowRadius: shadowRadius,
      elevation: elevation,
    };
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Icon name="shield-account" size={30} color="#fff" />
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.welcomeText}>Panel de Administración</Text>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userRole}>👑 Administrador Principal</Text>
        </View>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="bell" size={24} color="#333" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.navigate("Configuracion")}
        >
          <Icon name="cog" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statRow}>
        <View style={[styles.statCard, getShadowStyle()]}>
          <View style={[styles.statIcon, { backgroundColor: '#E3F2FD' }]}>
            <Icon name="account-school" size={24} color="#2196F3" />
          </View>
          <Text style={styles.statValue}>{stats.totalAlumnos}</Text>
          <Text style={styles.statLabel}>Alumnos</Text>
        </View>
        
        <View style={[styles.statCard, getShadowStyle()]}>
          <View style={[styles.statIcon, { backgroundColor: '#E8F5E9' }]}>
            <Icon name="teach" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.statValue}>{stats.totalProfesores}</Text>
          <Text style={styles.statLabel}>Profesores</Text>
        </View>
      </View>
      
      <View style={styles.statRow}>
        <View style={[styles.statCard, getShadowStyle()]}>
          <View style={[styles.statIcon, { backgroundColor: '#FFF3E0' }]}>
            <Icon name="book-open" size={24} color="#FF9800" />
          </View>
          <Text style={styles.statValue}>{stats.totalMaterias}</Text>
          <Text style={styles.statLabel}>Materias</Text>
        </View>
        
        <View style={[styles.statCard, getShadowStyle()]}>
          <View style={[styles.statIcon, { backgroundColor: '#F3E5F5' }]}>
            <Icon name="account-check" size={24} color="#9C27B0" />
          </View>
          <Text style={styles.statValue}>{stats.usuariosActivos}</Text>
          <Text style={styles.statLabel}>Activos</Text>
        </View>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={[styles.section, getShadowStyle(2, 0.05)]}>
      <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
      <View style={styles.actionsGrid}>
        {adminActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.actionCard, getShadowStyle(1, 0.05, 2)]}
            onPress={() => handleQuickAction(action)}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
              <Icon name={action.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.actionTitle}>{action.title}</Text>
            <Text style={styles.actionDescription}>{action.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSystemAlerts = () => (
    <View style={[styles.section, getShadowStyle(2, 0.05)]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Alertas del Sistema</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Alertas")}>
          <Text style={styles.seeAll}>Ver todas</Text>
        </TouchableOpacity>
      </View>
      
      {systemAlerts.map((alert) => (
        <View 
          key={alert.id} 
          style={[
            styles.alertCard,
            { borderLeftColor: alert.level === 'danger' ? '#F44336' : 
                         alert.level === 'warning' ? '#FF9800' : '#2196F3' }
          ]}
        >
          <Icon 
            name={alert.level === 'danger' ? "alert-circle" : 
                  alert.level === 'warning' ? "alert" : "information"} 
            size={20} 
            color={alert.level === 'danger' ? "#F44336" : 
                   alert.level === 'warning' ? "#FF9800" : "#2196F3"} 
          />
          <Text style={styles.alertMessage}>{alert.message}</Text>
        </View>
      ))}
    </View>
  );

  const renderRecentActivity = () => (
    <View style={[styles.section, getShadowStyle(2, 0.05)]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Actividad Reciente</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Actividad")}>
          <Text style={styles.seeAll}>Ver todo</Text>
        </TouchableOpacity>
      </View>
      
      {recentActivity.map((activity) => (
        <View key={activity.id} style={styles.activityItem}>
          <View style={[
            styles.activityIcon,
            { backgroundColor: 
              activity.type === 'calificacion' ? '#E8F5E9' : 
              activity.type === 'usuario' ? '#E3F2FD' : 
              activity.type === 'sistema' ? '#FFF3E0' : '#F3E5F5' 
            }
          ]}>
            <Icon 
              name={
                activity.type === 'calificacion' ? "file-document" : 
                activity.type === 'usuario' ? "account-plus" : 
                activity.type === 'sistema' ? "backup-restore" : "account-edit"
              } 
              size={18} 
              color="#666" 
            />
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityUser}>{activity.user}</Text>
            <Text style={styles.activityAction}>{activity.action}</Text>
          </View>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>
      ))}
    </View>
  );

  const renderSystemInfo = () => (
    <View style={styles.systemInfo}>
      <View style={styles.infoRow}>
        <Icon name="server" size={16} color="#666" />
        <Text style={styles.infoText}>Servidor: Online</Text>
      </View>
      <View style={styles.infoRow}>
        <Icon name="database" size={16} color="#666" />
        <Text style={styles.infoText}>Base de datos: 2.4 GB / 10 GB</Text>
      </View>
      <View style={styles.infoRow}>
        <Icon name="security" size={16} color="#666" />
        <Text style={styles.infoText}>Último backup: Hoy 00:00</Text>
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
      >
        {renderHeader()}
        {renderStats()}
        {renderQuickActions()}
        {renderSystemAlerts()}
        {renderRecentActivity()}
        {renderSystemInfo()}
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Sistema de Gestión Escolar v3.0 • Panel de Administración
          </Text>
          <Text style={styles.footerSubtext}>
            Última actualización: {new Date().toLocaleDateString()}
          </Text>
        </View>
      </ScrollView>

      {/* Modal de acción rápida */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, getShadowStyle(5, 0.2, 10)]}>
            <Text style={styles.modalTitle}>
              {selectedAction?.title || "Acción"}
            </Text>
            <Text style={styles.modalDescription}>
              {selectedAction?.description || "Descripción"}
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => {
                  setModalVisible(false);
                  Alert.alert("Acción", `${selectedAction?.title} ejecutada`);
                }}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6f42c1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  userRole: {
    fontSize: 12,
    color: "#6f42c1",
    fontWeight: "600",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
  },
  headerButton: {
    padding: 10,
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#F44336",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    alignItems: "center",
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
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
    color: "#333",
  },
  seeAll: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "500",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    width: "48%",
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    lineHeight: 14,
  },
  alertCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  alertMessage: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityUser: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  activityAction: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: "#999",
  },
  systemInfo: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 15,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 13,
    color: "#666",
  },
  footer: {
    paddingVertical: 25,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footerText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  footerSubtext: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "#007bff",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});