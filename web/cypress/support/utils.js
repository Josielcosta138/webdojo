export function dataAtualFormatada() {
      const hoje = new Date();

      const dia = String(hoje.getDate()).padStart(2, '0');    // Garante 2 dígitos
      const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
      const ano = hoje.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }