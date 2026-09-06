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

## Imagens e licenças

As fotografias foram obtidas no [Unsplash](https://unsplash.com/) e são distribuídas sob a [Unsplash License](https://unsplash.com/license), que permite uso gratuito em projetos pessoais e comerciais, sem atribuição obrigatória. Os arquivos ficam versionados localmente em `assets/images`, para que o site não dependa de carregamento remoto.

Fontes consultadas:

- `hero-car.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1503736334956-4c8f8e92946d)
- `detailing-exterior.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1492144534655-ae79c964c9d7)
- `detailing-interior-2.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1553440569-bcc63803a83d)
- `ceramic-protection.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1607860108855-64acf2078ed9)
- `technical-polish.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8)
