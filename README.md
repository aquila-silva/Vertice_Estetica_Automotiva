# Vértice Detail

Site estático da Vértice Detail, com as páginas públicas mantidas na raiz para preservar os links atuais:

- `index.html` — página inicial
- `servicos.html` — serviços
- `quem-somos.html` — institucional
- `contato.html` — contato
- `assets/index.html` — catálogo interno de mídia

## Estrutura

```text
assets/
  animations/  SVGs e animações reutilizáveis
  icons/       ícones da interface
  images/      imagens locais do site
  videos/      vídeos locais do portfólio
css/           estilos compartilhados
js/            comportamento compartilhado
```

As imagens usadas pelo site são locais e têm caminhos relativos ao CSS. Isso evita falhas de carregamento causadas por provedores externos e mantém a política CSP restrita a recursos do próprio projeto.
