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

## Autoria e licença

Projeto autoral de Aquila Fernando Alves Silva. O código e a estrutura deste projeto estão sob a licença [MIT](LICENSE). As fotografias possuem a licença própria indicada na seção abaixo e não devem ser interpretadas como parte da licença MIT.

## Imagens e licenças

As fotografias foram obtidas no [Unsplash](https://unsplash.com/) e são distribuídas sob a [Unsplash License](https://unsplash.com/license), que permite uso gratuito em projetos pessoais e comerciais, sem atribuição obrigatória. Os arquivos ficam versionados localmente em `assets/images`, para que o site não dependa de carregamento remoto.

Fontes consultadas:

- `hero-car.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1503736334956-4c8f8e92946d)
- `detailing-exterior.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1492144534655-ae79c964c9d7)
- `detailing-interior-2.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1553440569-bcc63803a83d)
- `ceramic-protection.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1607860108855-64acf2078ed9)
- `technical-polish.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8)

## Publicação

O projeto é um site estático e pode ser publicado em GitHub Pages, Netlify, Vercel ou em qualquer hospedagem que sirva HTML, CSS, JavaScript e arquivos estáticos.

Antes de apontar um domínio próprio:

1. Substitua os valores de exemplo do `site.webmanifest` pelos dados reais da marca.
2. Atualize o domínio no `sitemap.xml` e no `robots.txt`.
3. Configure HTTPS e o redirecionamento da versão sem `www` para a versão escolhida.
4. Troque o formulário de protótipo por um endpoint de produção com política de privacidade e armazenamento compatíveis com a legislação aplicável.
5. Gere os ícones e imagens sociais definitivos da marca antes do lançamento.

O formulário atual é intencionalmente um protótipo: valida os dados no navegador, não envia nem armazena informações e não deve ser tratado como integração de atendimento em produção.
