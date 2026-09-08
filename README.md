# Vértice Detail

Site institucional da Vértice Detail, uma experiência digital para estética automotiva de precisão. O projeto apresenta a marca, seus serviços, informações institucionais e um formulário de contato conectado ao Supabase.

O site foi construído como uma aplicação estática, sem framework e sem processo de build. As páginas são servidas diretamente da raiz do projeto, enquanto CSS, JavaScript e mídia ficam organizados em diretórios compartilhados.

## Sumário

- [Visão geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Estrutura de diretórios](#estrutura-de-diretórios)
- [Páginas e recursos](#páginas-e-recursos)
- [Funcionamento do formulário](#funcionamento-do-formulário)
- [Modelo de dados e segurança](#modelo-de-dados-e-segurança)
- [Execução local](#execução-local)
- [Publicação](#publicação)
- [Manutenção](#manutenção)
- [Imagens, fontes e licença](#imagens-fontes-e-licença)

## Visão geral

### Tecnologias

- HTML5 semântico para a estrutura das páginas.
- CSS3 para identidade visual, layout responsivo, animações e acessibilidade visual.
- JavaScript moderno no navegador, sem dependências de build.
- [Supabase JavaScript v2](https://supabase.com/docs/reference/javascript/introduction), carregado via CDN apenas na página de contato.
- Supabase Postgres e Row Level Security (RLS) para receber os contatos.
- Google Fonts para a família tipográfica Manrope.

### Características

- Navegação compartilhada entre as páginas públicas.
- Home com diferenciais, galeria, depoimentos, FAQ e mapa.
- Portfólio com filtros, lightbox e comparação visual antes/depois.
- Layout responsivo para desktop e dispositivos móveis.
- Menu móvel com suporte à tecla `Escape` e atributos ARIA.
- Validação no navegador com mensagens de erro associadas aos campos.
- Campo honeypot para reduzir envios automatizados simples.
- Feedback de carregamento, sucesso e erro no envio do formulário.
- Imagens, ícones e vídeos organizados localmente.
- Manifesto web, sitemap, robots.txt e página 404 incluídos.

## Arquitetura

O projeto segue uma arquitetura estática em camadas simples:

1. **Apresentação:** os arquivos HTML definem o conteúdo, a navegação e o formulário.
2. **Estilo:** `css/style.css` concentra a identidade visual e os componentes compartilhados; `css/assets.css` complementa a página de catálogo de mídia.
3. **Comportamento:** `js/main.js` inicializa o menu e o formulário quando os elementos correspondentes existem na página.
4. **Integração:** `js/supabase-client.js` encapsula a criação do cliente Supabase e expõe uma interface global mínima para o formulário.
5. **Persistência:** a migration SQL cria a tabela `public.cadastros`, suas restrições, permissões e política de inserção.

Não existe backend próprio nem etapa de compilação. O navegador carrega os arquivos diretamente e, na página de contato, acessa o Supabase usando a chave pública `anon`.

## Estrutura de diretórios

```text
.
├── 404.html                         # Página exibida para rotas inexistentes
├── contato.html                     # Página de contato e formulário
├── humans.txt                       # Informações de autoria do projeto
├── index.html                       # Página inicial
├── quem-somos.html                  # Página institucional
├── portfolio.html                   # Portfólio, filtros e comparação antes/depois
├── servicos.html                    # Apresentação dos serviços
├── site.webmanifest                 # Metadados para instalação como app
├── robots.txt                       # Regras para robôs de busca
├── sitemap.xml                      # URLs públicas para indexação
├── assets/
│   ├── index.html                   # Catálogo interno de mídia
│   ├── animations/                  # Animações e SVGs reutilizáveis
│   ├── icons/                       # Ícones da interface
│   ├── images/                      # Fotografias usadas nas páginas
│   └── videos/                      # Vídeos e instruções de mídia
├── css/
│   ├── assets.css                   # Estilos específicos do catálogo
│   └── style.css                    # Estilos globais e responsivos
├── js/
│   ├── main.js                      # Menu, validação e envio do formulário
│   └── supabase-client.js           # Fábrica do cliente Supabase
└── supabase/
    └── migrations/
        ├── 20260907_create_cadastros.sql # Schema, grants e RLS
        └── 20260908_add_contact_fields.sql # Campos telefone e serviço
```

### Responsabilidade dos arquivos principais

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Hero, posicionamento da marca, destaques e chamadas para ação. |
| `servicos.html` | Catálogo dos serviços de estética automotiva. |
| `quem-somos.html` | Conteúdo institucional e posicionamento da empresa. |
| `portfolio.html` | Trabalhos selecionados, filtros e comparação antes/depois. |
| `contato.html` | Dados de contato, formulário, consentimento e carregamento do Supabase. |
| `main.js` | Menu, validação, persistência do lead, filtros, lightbox e comparação. |
| `supabase-client.js` | Cria o cliente com `window.supabase.createClient` e expõe `window.UdiAutoLabSupabase.getClient()`. |
| `style.css` | Variáveis de cor, tipografia, componentes, grid, responsividade e estados de foco. |
| `assets.css` | Grid e cartões usados no catálogo de assets. |
| `20260907_create_cadastros.sql` | Cria a tabela de contatos e restringe inserções por RLS. |

## Páginas e recursos

As páginas públicas permanecem na raiz para preservar URLs simples e compatíveis com hospedagens estáticas:

- `/` ou `/index.html`: entrada principal do site.
- `/servicos.html`: serviços oferecidos.
- `/quem-somos.html`: apresentação institucional.
- `/portfolio.html`: trabalhos selecionados, filtros e comparação antes/depois.
- `/contato.html`: contato e conversão de visitantes em leads.
- `/404.html`: fallback visual para páginas inexistentes.
- `/assets/index.html`: catálogo interno para conferência de imagens, ícones e vídeos.

As páginas compartilham `css/style.css` e `js/main.js`. Como o JavaScript verifica a existência dos elementos antes de registrar eventos, o mesmo arquivo pode ser carregado em todas as páginas sem exigir lógica específica de cada rota.

## Funcionamento do formulário

O fluxo de envio em `js/main.js` é:

1. Interceptar o submit para evitar o envio HTML padrão.
2. Ignorar silenciosamente o envio quando o campo honeypot `website` estiver preenchido.
3. Validar nome, e-mail, telefone, serviço, carro, mensagem e consentimento.
4. Mostrar erros no campo correspondente e focar o primeiro campo inválido.
5. Desabilitar o botão e indicar que o envio está em andamento.
6. Obter o cliente por `window.UdiAutoLabSupabase.getClient()`.
7. Inserir o objeto `lead` na tabela `cadastros`.
8. Exibir confirmação e limpar o formulário quando o Supabase responder com sucesso.
9. Restaurar o botão e mostrar uma mensagem de erro quando a operação falhar.

O objeto enviado possui os campos:

```js
{
  name,
  email,
  phone,
  service,
  car,
  message,
  consent: true,
  source: "vertice-detail"
}
```

O SDK do Supabase é carregado em `contato.html` antes de `supabase-client.js`. Os scripts usam `defer`, preservando a ordem de carregamento sem bloquear a renderização do HTML.

## Modelo de dados e segurança

A migration `supabase/migrations/20260907_create_cadastros.sql` cria `public.cadastros` com:

- `id`: identificador inteiro autogerado.
- `name`: nome entre 2 e 80 caracteres.
- `email`: e-mail entre 3 e 120 caracteres.
- `phone`: telefone entre 8 e 20 caracteres, opcional para registros legados.
- `service`: serviço de interesse, opcional, com até 60 caracteres.
- `car`: modelo, ano e cor, opcional, com até 100 caracteres.
- `message`: mensagem entre 10 e 1000 caracteres.
- `consent`: obrigatório e sempre `true`.
- `source`: obrigatório e limitado a `vertice-detail`.
- `created_at`: data UTC gerada pelo banco.

O RLS permanece habilitado. A role `anon` recebe apenas permissão de inserção e a política exige `consent = true` e `source = 'vertice-detail'`. Não há leitura pública dos contatos.

A URL do projeto e a chave `anon` estão em `js/supabase-client.js`. Essa chave foi projetada para uso no frontend e não deve ser confundida com uma chave `service_role`, que nunca deve ser publicada. A proteção real dos dados depende das políticas RLS e das restrições do banco.

## Execução local

O projeto não exige Node.js, npm ou processo de build. Qualquer servidor de arquivos estáticos é suficiente.

Com Python instalado:

```bash
python3 -m http.server 8000
```

Depois, abra <http://localhost:8000> no navegador. Evite abrir os HTML diretamente com `file://`, pois alguns navegadores restringem recursos locais e requisições de origem cruzada nesse modo.

### Verificações rápidas

Antes de publicar, confirme:

```bash
node --check js/main.js
node --check js/supabase-client.js
git diff --check
```

Também teste manualmente o menu móvel, os estados de validação e um envio real do formulário em um ambiente Supabase configurado.

## Configuração do Supabase

Para configurar uma nova instância:

1. Crie um projeto no [Supabase](https://supabase.com/).
2. Abra o SQL Editor e execute `supabase/migrations/20260907_create_cadastros.sql`.
3. Confira a URL e a chave pública `anon` em **Project Settings → API**.
4. Atualize os valores correspondentes em `js/supabase-client.js`.
5. Faça um envio de teste e confirme a inserção em `public.cadastros`.

O endereço `https://cdn.jsdelivr.net` deve permanecer permitido na diretiva `script-src` da CSP de `contato.html`, pois o SDK é carregado desse CDN. O domínio do Supabase também precisa permanecer em `connect-src`.

## Publicação

O site pode ser publicado em GitHub Pages, Netlify, Vercel ou qualquer hospedagem que sirva arquivos estáticos.

Antes do lançamento:

1. Substitua os valores de exemplo do `site.webmanifest` pelos dados reais da marca.
2. Atualize o domínio em `sitemap.xml` e `robots.txt`.
3. Configure HTTPS e escolha uma versão canônica do domínio, com ou sem `www`.
4. Aplique e valide a migration no projeto Supabase de produção.
5. Revise a política de privacidade, retenção dos leads e processo de atendimento conforme a legislação aplicável.
6. Gere ícones e imagens sociais definitivos, se os arquivos atuais forem apenas placeholders.

## Manutenção

- Mantenha as páginas públicas na raiz para não quebrar os links existentes.
- Ao alterar campos do formulário, atualize simultaneamente `contato.html`, `main.js` e a migration ou restrição correspondente.
- Ao trocar a origem do SDK Supabase, atualize a tag `<script>` e a CSP.
- Ao adicionar imagens, use caminhos relativos e registre a origem/licença nesta documentação.
- Versione novas alterações de banco como migrations SQL, sem editar silenciosamente migrations já aplicadas.
- Não adicione chaves administrativas, tokens privados ou credenciais de serviço ao frontend.

## Imagens, fontes e licença

As fotografias foram obtidas no [Unsplash](https://unsplash.com/) e distribuídas sob a [Unsplash License](https://unsplash.com/license). Os arquivos ficam versionados em `assets/images` para evitar dependência de carregamento remoto.

Fontes consultadas:

- `hero-car.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1503736334956-4c8f8e92946d)
- `detailing-exterior.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1492144534655-ae79c964c9d7)
- `detailing-interior-2.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1553440569-bcc63803a83d)
- `ceramic-protection.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1607860108855-64acf2078ed9)
- `technical-polish.jpg` — [Unsplash Source](https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8)

O código e a estrutura do projeto são de autoria de Aquila Fernando Alves Silva e estão sob a licença [MIT](LICENSE). As fotografias e demais recursos de terceiros permanecem sujeitos às suas próprias licenças e não são abrangidos automaticamente pela licença MIT.
