<script setup lang="ts">
import Button from '@/app/components/UI/ButtonComponent.vue'
import Card from '@/app/components/UI/CardComponent.vue'
import LocawebLogo from '@/app/components/assets/images/LocawebLogo.vue'
</script>

<template>
  <main>
    <LocawebLogo />
    <h2>Você está muito próximo de mudar a forma de <span>hospedar seu site</span></h2>
    <p>Escolha seu plano</p>
    <div>
      <Card>
        <div>
          <h2>Hospedagem 1</h2>
          <span>Grátis</span>
          <span>Você não paga nada para usar</span>
          <span>sem taxa de setup</span>
        </div>
        <div>Ideal para quem está começando</div>
        <div>
          <Button>ESCOLHER ESSE PLANO</Button>
          <h3>Seu site em servidores <span>no Estados Unidos</span></h3>
          <ul>
            <li>Itens</li>
          </ul>
          <h3>Suporte 24 horas, 7 dias por semna grátis;</h3>
          <h3>Aplicativos disponíveis;</h3>
          <ul>
            <li>Itens</li>
          </ul>
          <h3>Você ainda tem</h3>
          <ul>
            <li>Itens</li>
          </ul>
        </div>
      </Card>
    </div>
  </main>
</template>
