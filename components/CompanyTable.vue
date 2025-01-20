<template>
    <div class="overflow-x-auto">

        <a-table :columns="columns" :dataSource="companies" rowKey="id" class="mb-4">
            <template #bodyCell="{ column, record }">

                <template v-if="column.dataIndex === 'logoUrl'">
                    <img :src="record.logoUrl" alt="Logo" class="w-12 h-12 object-cover" />
                </template>

                <template v-if="column.dataIndex === 'name'">
                    {{ record.name }}
                </template>

                <template v-if="column.dataIndex === 'description'">
                    {{ record.description }}
                </template>

                <template v-if="column.dataIndex === 'actions'">
                    <a-button @click="editCompany(record)" type="primary" class="mr-2">Edit</a-button>
                    <a-button @click="deleteCompany(record)" type="danger">Delete</a-button>
                </template>
            </template>
        </a-table>

        <a-button @click="showAddCompanyModal" type="primary">Add Company</a-button>

        <a-modal v-model:open="isAddCompanyModalVisible" title="Add New Company" @ok="addNewCompany">
            <a-form :model="newCompany" layout="vertical">
                <a-form-item label="Name">
                    <a-input v-model:value="newCompany.name" />
                </a-form-item>

                <a-form-item label="Description">
                    <a-input v-model:value="newCompany.description" />
                </a-form-item>

                <a-form-item label="Logo URL">
                    <a-input v-model:value="newCompany.logoUrl" />
                </a-form-item>
            </a-form>
        </a-modal>

        <a-modal v-model:open="isModalVisible" title="Edit Company" @ok="saveEditedCompany">
            <a-form :model="currentCompany" layout="vertical">
                <a-form-item label="Name">
                    <a-input v-model:value="currentCompany.name" />
                </a-form-item>

                <a-form-item label="Description">
                    <a-input v-model:value="currentCompany.description" />
                </a-form-item>

                <a-form-item label="Logo URL">
                    <a-input v-model:value="currentCompany.logoUrl" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const companies = ref([])

const isModalVisible = ref(false)

const isAddCompanyModalVisible = ref(false)

const currentCompany = ref(null)

const newCompany = ref({
    name: '',
    description: '',
    logoUrl: ''
})

const isFormValid = (company) => {
    return (
        company.name.trim() !== '' &&
        company.description.trim() !== '' &&
        company.logoUrl.trim() !== ''
    );
};


const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Logo', dataIndex: 'logoUrl' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Actions', dataIndex: 'actions' },
]

const loadCompanies = async () => {
    try {
        const response = await fetch('/companies.json')

        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных')
        }

        const data = await response.json()
        companies.value = data.items
    } catch (error) {
        console.error('Error loading companies:', error)
    }
}


const editCompany = (company) => {
    currentCompany.value = { ...company }
    isModalVisible.value = true
}

const saveEditedCompany = () => {
    if (!isFormValid(currentCompany.value)) {
        console.warn('Cannot save: All fields must be filled!');
        return;
    }
    if (currentCompany.value) {
        const index = companies.value.findIndex(c => c.id === currentCompany.value.id)
        if (index !== -1) {
            companies.value[index] = { ...currentCompany.value }
        }
        isModalVisible.value = false
    }
}


const deleteCompany = (company) => {
    const index = companies.value.findIndex(c => c.id === company.id)
    if (index !== -1) {
        companies.value.splice(index, 1)
    }
    console.log('Deleted company', company)
}

const showAddCompanyModal = () => {
    isAddCompanyModalVisible.value = true
}


const addNewCompany = () => {
    if (!isFormValid(newCompany.value)) {
        console.warn('Cannot add company: All fields must be filled!');
        return;
    }
    const newCompanyData = {
        id: Date.now(),
        name: newCompany.value.name,
        description: newCompany.value.description,
        logoUrl: newCompany.value.logoUrl,
    }
    companies.value = [newCompanyData, ...companies.value]
    closeAddCompanyModal()
    console.log('Added new company', newCompanyData)
}

// Закрытие модального окна для добавления компании
const closeAddCompanyModal = () => {
    newCompany.value = { name: '', description: '', logoUrl: '' } // Сброс данных формы
    isAddCompanyModalVisible.value = false
}

onMounted(() => {
    loadCompanies()
})
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: left;
}

th {
    background-color: #f4f4f4;
}
</style>