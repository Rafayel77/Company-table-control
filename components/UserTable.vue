<template>
  <div class="overflow-x-auto">
    <h1 class="text-2xl font-bold mb-4">Users</h1>
    <a-table :columns="columns" :data-source="users" row-key="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'firstname'">
          {{ record.firstname }}
        </template>
        <template v-if="column.dataIndex === 'lastname'">
          {{ record.lastname }}
        </template>
        <template v-if="column.dataIndex === 'email'">
          {{ record.email }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  }

  interface Column {
    title: string;
    dataIndex: keyof User;
  }

  const users = ref<User[]>([]);

  const columns: Column[] = [
    { title: 'First Name', dataIndex: 'firstname' },
    { title: 'Last Name', dataIndex: 'lastname' },
    { title: 'Email', dataIndex: 'email' },
  ];

  const loadUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.org/users');

      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }

      const data = await response.json();
      users.value = data;
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  onMounted(() => {
    loadUsers();
  });
</script>
