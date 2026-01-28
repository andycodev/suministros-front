<template>
    <div class="space-y-6">
        <h1 class="text-3xl font-bold">Configuración</h1>

        <!-- Información del Sistema -->
        <div class="bg-base-100 rounded-lg shadow p-6">
            <h2 class="text-xl font-bold mb-4">Información del Sistema</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-500">Versión</p>
                    <p class="font-semibold">v1.0.0</p>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Última Actualización</p>
                    <p class="font-semibold">27 de Enero, 2026</p>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Ambiente</p>
                    <p class="font-semibold">Producción</p>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Base de Datos</p>
                    <p class="font-semibold">PostgreSQL 14</p>
                </div>
            </div>
        </div>

        <!-- Configuración General -->
        <div class="bg-base-100 rounded-lg shadow p-6">
            <h2 class="text-xl font-bold mb-4">Configuración General</h2>
            <div class="space-y-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Nombre de la Organización</span>
                    </label>
                    <input type="text" v-model="settings.orgName" class="input input-bordered" />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email de Contacto</span>
                    </label>
                    <input type="email" v-model="settings.contactEmail" class="input input-bordered" />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Teléfono de Contacto</span>
                    </label>
                    <input type="tel" v-model="settings.contactPhone" class="input input-bordered" />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Moneda por Defecto</span>
                    </label>
                    <select v-model="settings.currency" class="select select-bordered">
                        <option value="PEN">Soles (PEN)</option>
                        <option value="USD">Dólares (USD)</option>
                    </select>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Idioma</span>
                    </label>
                    <select v-model="settings.language" class="select select-bordered">
                        <option value="es">Español</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Configuración de Notificaciones -->
        <div class="bg-base-100 rounded-lg shadow p-6">
            <h2 class="text-xl font-bold mb-4">Notificaciones</h2>
            <div class="space-y-4">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Notificaciones por Email</span>
                        <input type="checkbox" v-model="settings.emailNotifications"
                            class="checkbox checkbox-primary" />
                    </label>
                </div>

                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Notificaciones de Nuevos Pedidos</span>
                        <input type="checkbox" v-model="settings.orderNotifications"
                            class="checkbox checkbox-primary" />
                    </label>
                </div>

                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Alertas de Stock Bajo</span>
                        <input type="checkbox" v-model="settings.stockAlerts" class="checkbox checkbox-primary" />
                    </label>
                </div>

                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Reportes Semanales</span>
                        <input type="checkbox" v-model="settings.weeklyReports" class="checkbox checkbox-primary" />
                    </label>
                </div>
            </div>
        </div>

        <!-- Configuración de Seguridad -->
        <div class="bg-base-100 rounded-lg shadow p-6">
            <h2 class="text-xl font-bold mb-4">Seguridad</h2>
            <div class="space-y-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Duración de Sesión (minutos)</span>
                    </label>
                    <input type="number" v-model="settings.sessionTimeout" class="input input-bordered" min="15"
                        max="480" />
                </div>

                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Autenticación de Dos Factores</span>
                        <input type="checkbox" v-model="settings.twoFactorAuth" class="checkbox checkbox-primary" />
                    </label>
                </div>

                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Registro de Actividad</span>
                        <input type="checkbox" v-model="settings.activityLog" class="checkbox checkbox-primary" />
                    </label>
                </div>
            </div>
        </div>

        <!-- Acciones -->
        <div class="flex justify-end space-x-4">
            <button class="btn btn-outline btn-secondary">Cancelar</button>
            <button class="btn btn-primary" @click="saveSettings">Guardar Cambios</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const settings = ref({
    orgName: 'Publicaciones Adventistas',
    contactEmail: 'contacto@publicaciones.org',
    contactPhone: '+51 1 234 5678',
    currency: 'PEN',
    language: 'es',
    emailNotifications: true,
    orderNotifications: true,
    stockAlerts: true,
    weeklyReports: false,
    sessionTimeout: 120,
    twoFactorAuth: false,
    activityLog: true
});

const saveSettings = () => {
    // Aquí iría la lógica para guardar la configuración
    console.log('Guardando configuración:', settings.value);
    // Mostrar mensaje de éxito
};
</script>
