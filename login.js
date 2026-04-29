const SUPABASE_URL = "https://dcruyugvpftdvqdcnjdl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjcnV5dWd2cGZ0ZHZxZGNuamRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDYxNjUsImV4cCI6MjA4ODMyMjE2NX0.ER8vVJXTYbQjteLe4iATn_nto4aoKgxMiZQ_P25y7QY";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginInput = document.getElementById("login");
const senhaInput = document.getElementById("senha");
const btnEntrar = document.getElementById("btnEntrar");
const msg = document.getElementById("msg");

// ===== ativa botão só se tiver tudo preenchido =====
function validarBotaoLogin() {
  const loginOk = loginInput.value.trim().length > 0;
  const senhaOk = senhaInput.value.trim().length > 0;

  btnEntrar.disabled = !(loginOk && senhaOk);
}

// ===== eventos em tempo real =====
loginInput.addEventListener("input", validarBotaoLogin);
senhaInput.addEventListener("input", validarBotaoLogin);

// ===== login fake (você depois liga no Supabase no auth.js) =====
function login() {
  if (btnEntrar.disabled) return;

  const login = loginInput.value.trim();
  const senha = senhaInput.value.trim();

  if (!login || !senha) {
    msg.innerText = "Preencha todos os campos!";
    return;
  }

  msg.style.color = "green";
  msg.innerText = "Login validado (pronto para Supabase)";
}