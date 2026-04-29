const emailInput = document.getElementById("email");
const telefoneInput = document.getElementById("telefone");
const cpfInput = document.getElementById("cpf");
const senhaInput = document.getElementById("senha");
const confirmarSenhaInput = document.getElementById("confirmarSenha");
const instituicaoInput = document.getElementById("instituicao");
const btn = document.getElementById("btnCadastrar");
const msg = document.getElementById("msg");

// liberar botão quando qualquer campo mudar
document.querySelectorAll("input,select").forEach(el=>{
  el.addEventListener("input", validarFormulario);
  el.addEventListener("change", validarFormulario);
});

function validarFormulario(){
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
  const telefoneValido = telefoneInput.value.length >= 10;
  const cpfValido = cpfInput.value.length >= 11;
  const instituicaoOk = instituicaoInput.value !== "";
  const senhaValida = senhaInput.value.length >= 6;
  const senhasIguais = senhaInput.value === confirmarSenhaInput.value;

  btn.disabled = !(emailValido && telefoneValido && cpfValido && instituicaoOk && senhaValida && senhasIguais);
}

window.cadastrar = async function(){

  if(btn.disabled) return;

  msg.innerText = "Criando conta...";

  const email = emailInput.value;
  const telefone = telefoneInput.value.replace(/\D/g,"");
  const cpf = cpfInput.value;
  const instituicao = instituicaoInput.value;
  const senha = senhaInput.value;

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    phone: telefone,
    password: senha
  });

  if(error){
    msg.innerText = error.message;
    msg.style.color="red";
    return;
  }

  const { data: sessionData } = await supabaseClient.auth.getSession();
  const userId = sessionData.session.user.id;

  const { error: erroDB } = await supabaseClient
    .from("usuarios")
    .insert({
      id:userId,
      email,
      telefone,
      cpf,
      instituicao
    });

  if(erroDB){
    msg.innerText = erroDB.message;
    msg.style.color="red";
    return;
  }

  msg.style.color="green";
  msg.innerText="Conta criada com sucesso!";
};