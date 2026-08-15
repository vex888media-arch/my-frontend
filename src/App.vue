<template>
  <div class="min-h-screen bg-dark-gradient text-white p-4 pb-12 select-none">
    <header class="flex justify-between items-center mb-6 pt-2">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 rounded-full bg-gold-gradient p-[1px] shadow-gold-glow">
          <div class="w-full h-full bg-black rounded-full flex items-center justify-center font-bold text-xs text-gold-accent">
            GP
          </div>
        </div>
        <span class="font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gold-gradient">
          GPCA PRIVATE
        </span>
      </div>
      <div class="text-xs px-3 py-1 rounded-full border border-gold-500/30 bg-black/40 text-gold-accent backdrop-blur-md">
        VIP 尊榮會員
      </div>
    </header>

    <div class="relative w-full aspect-[1.586/1] rounded-2xl p-6 bg-dark-card border border-gold-500/40 shadow-card-luxury overflow-hidden mb-6 group transition-all duration-500">
      <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl group-hover:bg-gold-500/20 transition-all"></div>
      
      <div class="relative z-10 flex flex-col justify-between h-full">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-[10px] tracking-widest text-gray-400 uppercase">GPCA BLACK CARD</p>
            <p class="text-xs font-semibold text-gold-accent tracking-widest">PREMIUM ISSUING</p>
          </div>
          <div class="w-10 h-7 bg-gold-gradient rounded-md opacity-80 shadow-sm"></div>
        </div>

        <div class="my-auto py-2">
          <p class="text-xs text-gray-400 mb-1">Card Number</p>
          <p class="font-mono text-lg md:text-xl tracking-widest text-gold-300 font-bold drop-shadow">
            {{ activeCard ? activeCard.cardNumber : '•••• •••• •••• 8888' }}
          </p>
        </div>

        <div class="flex justify-between items-end text-xs">
          <div>
            <p class="text-[9px] text-gray-400 uppercase">Card Holder</p>
            <p class="font-medium tracking-wide text-gray-200">{{ tgUser ? tgUser.first_name : 'VALUED CUSTOMER' }}</p>
          </div>
          <div>
            <p class="text-[9px] text-gray-400 uppercase">Expires</p>
            <p class="font-mono text-gray-200">{{ activeCard ? activeCard.exp : '12/29' }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-black/60 border border-gold-500/20 rounded-2xl p-5 backdrop-blur-xl mb-6 shadow-lg">
      <h3 class="text-sm font-semibold text-gold-accent mb-3 flex items-center">
        <span class="w-1.5 h-1.5 rounded-full bg-gold-400 mr-2 shadow-gold-glow"></span>
        開卡預存額度 (最低 50 USDT)
      </h3>
      
      <div class="relative mb-4">
        <input 
          v-model.number="depositAmount" 
          type="number" 
          min="50"
          class="w-full bg-dark-900/90 border border-gold-500/30 rounded-xl px-4 py-3 text-gold-300 font-mono text-lg focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
          placeholder="50"
        />
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gold-accent">USDT</span>
      </div>

      <button 
        @click="handleIssueCard" 
        :disabled="loading"
        class="w-full py-3.5 rounded-xl font-bold text-black bg-gold-gradient shadow-gold-glow active:scale-[0.98] transition-transform duration-150 disabled:opacity-50"
      >
        <span v-if="!loading">立即尊榮開卡</span>
        <span v-else class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          通訊中...
        </span>
      </button>
    </div>

    <div class="text-center">
      <a 
        :href="'https://t.me/' + agentContact.replace('@','')" 
        target="_blank" 
        class="inline-flex items-center text-xs text-gold-500/80 hover:text-gold-300 transition-colors"
      >
        <span>聯繫專屬 1-on-1 代理客戶經理 ({{ agentContact }})</span>
        <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const BACKEND_URL = 'https://my-backend-45cq.onrender.com'

const depositAmount = ref(50)
const loading = ref(false)
const activeCard = ref(null)
const agentContact = ref('@gbcbreakingnews777')
const tgUser = ref(null)

onMounted(async () => {
  if (window.Telegram?.WebApp) {
    const webapp = window.Telegram.WebApp
    webapp.ready()
    webapp.expand()
    tgUser.value = webapp.initDataUnsafe?.user || null
  }

  try {
    const res = await axios.get(`${BACKEND_URL}/api/config`)
    if (res.data?.data?.agentContact) {
      agentContact.value = res.data.data.agentContact
    }
  } catch (err) {
    console.error("無法連線至 Render 後端:", err)
  }
})

const handleIssueCard = async () => {
  if (depositAmount.value < 50) {
    alert('預存開卡金額低於門檻 50 USDT')
    return
  }

  loading.value = true
  try {
    const res = await axios.post(`${BACKEND_URL}/api/cards/issue`, {
      tgUserId: tgUser.value?.id || 'guest_user',
      depositAmount: depositAmount.value
    })

    if (res.data?.success) {
      activeCard.value = res.data.cardDetails
      alert('🎉 開卡成功！已為您生成 GPCA 專屬黑金卡')
    }
  } catch (err) {
    alert(err.response?.data?.message || '開卡服務繁忙，請稍後再試')
  } finally {
    loading.value = false
  }
}
</script>
