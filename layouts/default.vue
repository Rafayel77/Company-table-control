<template>
  <div class="min-h-screen flex">
    <aside class="w-64 bg-gray-800 text-white flex flex-col">
      <nav class="flex-1">
        <ul class="space-y-4 p-4">
          <li>
            <NuxtLink to="/" class="flex items-center justify-center">
              <img src="~/assets/images/app-logo.png" alt="Logo" class="" />
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/companies"
              class="w-full text-left py-2 px-4 hover:bg-gray-700"
            >
              🏢 Companies
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/users"
              class="w-full text-left py-2 px-4 hover:bg-gray-700"
            >
              👤 Users
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="flex-1 flex">
      <main class="flex-1 p-4">
        <slot />
      </main>
    </div>
  </div>
</template>
