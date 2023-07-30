<template>
   <div>
      <h1>Knights Challenge</h1>
      <table>
         <thead>
            <tr>
               <th>Nome</th>
               <th>Idade</th>
               <th>Armas</th>
               <th>Atributo</th>
               <th>Ataque</th>
               <th>Exp</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="knight in knights" :key="knight.id">
               <td>{{ knight.name }}</td>
               <td>{{ knight.birthday }}</td>
               <td>{{ knight.weapons.length }}</td>
               <td>{{ knight.keyAttribute }}</td>
               <td>{{ knight.attack }}</td>
               <td>{{ knight.exp }}</td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script lang="ts">
   import { defineComponent, ref, onMounted } from 'vue';
   import axios from 'axios'

   interface Knight {
      id: number;
      name: string;
      birthday: string;
      weapons: string;
      keyAttribute: string;
      attack: number;
      exp: string;
   }

   export default defineComponent({
      setup() {
         const knights = ref<Knight[]>([]);

         onMounted(async () => {
            try {
               const response = await axios.get('http://localhost:3001/knights');
               knights.value = response.data;
            } catch (e: any) {
               console.log(e, 'Erro buscando os dados da API');
            }
         });



         return {
            knights,
         }
      }

      
   })
  
</script>





