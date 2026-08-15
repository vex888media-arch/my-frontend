<template>
  <div class="min-h-screen bg-neutral-950 text-white p-4 max-w-md mx-auto flex flex-col justify-between select-none">
    <!-- Header -->
    <div class="flex items-center justify-between py-2">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-200 flex items-center justify-center font-bold text-black text-xs shadow-lg shadow-yellow-500/20">
          GP
        </div>
        <span class="font-bold tracking-wider text-sm bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">GPCA Card</span>
      </div>
      <span class="text-xs px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 font-medium">
        VIP 尊榮會員
      </span>
    </div>

    <!-- Black Card UI -->
    <div class="relative w-full aspect-[1.586/1] my-4 rounded-2xl p-6 overflow-hidden border border-yellow-500/40 shadow-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black flex flex-col justify-between">
      <!-- Background Ambient Glow -->
      <div class="absolute -top-12 -right-12 w-40 h-40 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none"></div>
      <div class="absolute -bottom-12 -left-12 w-40 h-40 bg-yellow-600/10 rounded-full blur-2xl pointer-events-none"></div>

      <!-- Top Row -->
      <div class="flex justify-between items-start z-10">
        <div>
          <p class="text-[10px] tracking-widest text-neutral-400 uppercase">GPCA BLACK CARD</p>
          <p class="text-xs font-semibold text-yellow-400/90 tracking-wider">PREMIUM ISSUING</p>
        </div>
        <div class="w-9 h-7 rounded bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 opacity-80 flex items-center justify-center shadow">
          <div class="w-7 h-5 border border-black/30 rounded-sm"></div>
        </div>
      </div>

      <!-- Card Number -->
      <div class="z-10 my-auto">
        <p class="text-xs text-neutral-400 mb-1">Card Number</p>
        <p class="text-lg tracking-widest font-mono font-bold bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
          •••• •••• •••• 8888
        </p>
      </div>

      <!-- Bottom Row -->
      <div class="flex justify-between items-end z-10">
        <div>
          <p class="text-[9px] text-neutral-400 uppercase tracking-wider">Card Holder</p>
          <p class="text-xs font-bold tracking-wider text-neutral-200">VALUED CUSTOMER</p>
        </div>
        <div>
          <p class="text-[9px] text-neutral-400 uppercase tracking-wider text-right">Expires</p>
          <p class="text-xs font-mono font-semibold text-yellow-400">12/29</p>
        </div>
      </div>
    </div>

    <!-- Deposit Options -->
    <div class="space-y-4">
      <div class="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
        <label class="block text-xs text-neutral-400 mb-2 font-medium">
          開卡預存額度 (最低 50 USDT)
        </label>
        <div class="relative flex items-center">
          <input 
            v-model.number="amount"
            type="number" 
            min="50" 
            class="w-full bg-neutral-950 border border-neutral-700 focus:border-yellow-500 text-white rounded-lg px-3 py-2.5 text-base font-bold outline-none transition-all"
            placeholder="50"
          />
          <span class="absolute right-3 text-xs font-bold text-yellow-500">USDT</span>
        </div>

        <!-- Quick Select Buttons -->
        <div class="grid grid-cols-4 gap-2 mt-3">
          <button 
            v-for="opt in [50, 100, 300, 500]" 
            :key="opt"
            @click="amount = opt"
            :class="[
              'py-1.5 rounded-lg text-xs font-semibold transition-all border',
              amount === opt 
                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' 
                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
            ]"
          >
            ${{ opt }}
          </button>
        </div>
      </div>

      <!-- Action Button -->
      <button 
        @click="handleApply"
        :disabled="loading || amount < 50"
        class="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 text-black font-extrabold text-sm tracking-wider shadow-lg shadow-yellow-500/20 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <span v-if="loading" class="inline-block animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></span>
        <span>{{ loading ? '開卡處理中...' : '立即尊榮開卡' }}</span>
      </button>

      <!-- Customer Support Footer -->
      <div class="text-center pt-2">
        <p class="text-[11px] text-neutral-500">
          尊榮專屬 1-on-1 代辦管家服務 
          <a href="https://t.me/gbcbreakingnews777" target="_blank" class="text-yellow-500 hover:underline font-medium">@gbcbreakingnews777</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const amount = ref(50)
const loading = ref(false)

const handleApply = () => {
  if (amount.value < 50) return
  loading.value = true
  
  // 模擬開卡請求處理
  setTimeout(() => {
    loading.value = false
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(`尊榮開卡申請已提交！\n開卡預存金額：${amount.value} USDT\n客服將盡速為您處理。`)
    } else {
      alert(`尊榮開卡申請已提交！\n開卡預存金額：${amount.value} USDT`)
    }
  }, 1200)
}
</script>
