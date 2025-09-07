/* Início do script JavaScript que controla a navegação e interação */
    const headerLinks = document.querySelectorAll('.header-link'); // Seleciona todos os links do cabeçalho
    const footerLinks = document.querySelectorAll('.footer-link'); // Seleciona todos os links do rodapé
    const dots = document.querySelectorAll('.dot'); // Seleciona todas as bolinhas de navegação
    const sections = document.querySelectorAll('.section'); // Seleciona todas as seções de conteúdo
    let currentIndex = 0; // Guarda o índice da seção atualmente ativa (0 = primeira)

    function showSection(index) { // Declara função responsável por mostrar a seção desejada
      sections.forEach((sec, i) => { // Percorre todas as seções com seus índices
        sec.classList.toggle('active', i === index); // Ativa a seção se o índice bater; desativa caso contrário
      }); // Fim do forEach das seções

      headerLinks.forEach(link => link.classList.remove('active')); // Remove estado ativo de todos os links do header
      footerLinks.forEach(link => link.classList.remove('active')); // Remove estado ativo de todos os links do footer
      dots.forEach(dot => dot.classList.remove('active')); // Remove estado ativo de todas as bolinhas

      headerLinks[index].classList.add('active'); // Marca o link do header correspondente como ativo
      footerLinks[index].classList.add('active'); // Marca o link do footer correspondente como ativo
      dots[index].classList.add('active'); // Marca a bolinha correspondente como ativa

      currentIndex = index; // Atualiza a variável de controle com o índice atualmente exibido
    } // Fim da função showSection

    headerLinks.forEach((link, i) => { // Para cada link do header com seu índice
      link.addEventListener('click', e => { // Adiciona ouvinte de clique no link
        e.preventDefault(); // Evita o comportamento padrão de ir para a âncora da URL
        showSection(i); // Chama a função para exibir a seção correspondente ao link clicado
      }); // Fim do callback do evento de clique
    }); // Fim do forEach dos links do header

    footerLinks.forEach((link, i) => { // Para cada link do footer com seu índice
      link.addEventListener('click', e => { // Adiciona ouvinte de clique no link do rodapé
        e.preventDefault(); // Impede salto automático para a âncora
        showSection(i); // Exibe a seção associada a este link
      }); // Fim do callback do clique no rodapé
    }); // Fim do forEach dos links do footer

    dots.forEach((dot, i) => { // Para cada bolinha com seu índice
      dot.addEventListener('click', () => { // Adiciona ouvinte de clique na bolinha
        showSection(i); // Exibe a seção correspondente à bolinha clicada
      }); // Fim do callback de clique da bolinha
    }); // Fim do forEach das bolinhas

    showSection(0); // Garante que a primeira seção esteja visível e estados sincronizados ao carregar a página

    // --- SWIPE NO CELULAR --- // Comentário indicando a funcionalidade de gesto no touch
    let startX = 0; // Variável para armazenar a posição inicial do toque no eixo X
    let endX = 0; // Variável para armazenar a posição final do toque no eixo X

    document.addEventListener("touchstart", (e) => { // Ouvinte para início do toque na tela
      startX = e.touches[0].clientX; // Captura a coordenada X do primeiro dedo que tocou
    }); // Fim do evento touchstart

    document.addEventListener("touchend", (e) => { // Ouvinte para fim do toque na tela
      endX = e.changedTouches[0].clientX; // Captura a coordenada X quando o dedo é retirado
      let diffX = endX - startX; // Calcula a diferença para saber direção do gesto

      if (Math.abs(diffX) > 50) { // só considera swipe forte // Exige deslocamento mínimo para evitar falsos positivos
        if (diffX < 0 && currentIndex < sections.length - 1) { // Se arrastou para a esquerda e não está na última seção
          // swipe pra esquerda → próxima // Comentário explicando a direção e ação
          showSection(currentIndex + 1); // Avança para a próxima seção
        } else if (diffX > 0 && currentIndex > 0) { // Se arrastou para a direita e não está na primeira seção
          // swipe pra direita → anterior // Comentário explicativo da ação
          showSection(currentIndex - 1); // Volta para a seção anterior
        } // Fim da verificação de limites
      } // Fim da checagem de intensidade do swipe
    }); // Fim do evento touchend

    // --- TECLAS DE SETA NO WEB --- // Comentário indicando a navegação por teclado no desktop/navegador
    document.addEventListener("keydown", (e) => { // Adiciona ouvinte para teclas pressionadas no documento
      if (e.key === "ArrowRight" && currentIndex < sections.length - 1) { // Se pressionou seta para direita e não está na última seção
        showSection(currentIndex + 1); // Vai para a próxima seção
      } else if (e.key === "ArrowLeft" && currentIndex > 0) { // Se pressionou seta para esquerda e não está na primeira seção
        showSection(currentIndex - 1); // Volta para a seção anterior
      } // Fim do if/else das setas
    }); // Fim do evento keydown