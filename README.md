# CDMJJ — Comissão de Direitos das Mulheres no Jiu-Jitsu

Site institucional e Canal de Denúncias da Comissão de Direitos das Mulheres no Jiu-Jitsu.

## Páginas

| Rota           | Conteúdo                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| `/`            | Apresentação da Comissão, os cinco pilares e a lógica de atuação.        |
| `/denuncia`    | Formulário de denúncia anônima ou identificada, com envio por e-mail.    |
| `/privacidade` | Aviso de privacidade e informações sobre o tratamento dos dados.         |

## Stack

- Next.js 16 (App Router, Turbopack e Cache Components)
- React 19 e TypeScript
- Tailwind CSS v4
- Motion para as animações de entrada
- React Hook Form + Zod para validação
- Resend ou SMTP (Nodemailer) para o envio das denúncias

O site não usa banco de dados. O relato é validado no servidor e encaminhado por e-mail ao endereço configurado; nenhum conteúdo de denúncia fica armazenado na aplicação.

## Como rodar

Requisitos: Node.js 20 ou superior.

```bash
npm install
```

Crie o arquivo de ambiente local:

```powershell
Copy-Item .env.example .env.local
```

```bash
npm run dev
```

Acesse `http://localhost:3000`.

Para gerar a versão de produção:

```bash
npm run build
npm start
```

## Configuração do e-mail

As denúncias são enviadas para `cdmjiujitsu@gmail.com` por padrão. O envio real precisa de **uma** das opções abaixo configurada.

### Opção 1 — Resend (recomendado em produção)

1. Crie uma conta em [resend.com](https://resend.com) e verifique um domínio de envio.
2. Gere uma API key.
3. Configure no ambiente:

```env
RESEND_API_KEY=re_xxxxxxxxx
DENUNCIA_EMAIL_TO=cdmjiujitsu@gmail.com
DENUNCIA_EMAIL_FROM="CDMJJ - Canal de Denúncias" <canal@seudominio.org.br>
```

O endereço em `DENUNCIA_EMAIL_FROM` precisa pertencer a um domínio verificado no Resend.

### Opção 2 — SMTP do Gmail

1. Ative a verificação em duas etapas na conta `cdmjiujitsu@gmail.com`.
2. Crie uma **senha de app** (não use a senha normal da conta).
3. Preencha o `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=cdmjiujitsu@gmail.com
SMTP_PASS=sua-senha-de-app
DENUNCIA_EMAIL_FROM="CDMJJ - Canal de Denúncias" <cdmjiujitsu@gmail.com>
DENUNCIA_EMAIL_TO=cdmjiujitsu@gmail.com
```

> Para relatos sensíveis, prefira um e-mail institucional em domínio próprio, com controle de acesso e política de retenção. O Gmail atende ao envio, mas a caixa de entrada deve ser protegida com 2FA e acesso restrito.

### Sem provedor configurado

- Em desenvolvimento, o envio é simulado: a API retorna o protocolo e registra no console que o e-mail não foi configurado.
- Em produção, a API responde com erro 503 para não perder uma denúncia silenciosamente.

## Variáveis de ambiente

| Variável                   | Obrigatória | Descrição                                                                 |
| -------------------------- | ----------- | ------------------------------------------------------------------------- |
| `DENUNCIA_EMAIL_TO`        | Não         | Destinatário(s) separados por vírgula. Padrão: `cdmjiujitsu@gmail.com`.    |
| `DENUNCIA_EMAIL_FROM`      | Sim*        | Remetente exibido no e-mail.                                               |
| `RESEND_API_KEY`           | Não         | Ativa o envio pelo Resend.                                                 |
| `SMTP_HOST`                | Não         | Servidor SMTP, se usar essa opção.                                         |
| `SMTP_PORT`                | Não         | Porta SMTP. Padrão: `587`.                                                 |
| `SMTP_SECURE`              | Não         | `true` para conexão segura direta (normalmente porta 465).                 |
| `SMTP_USER`                | Não         | Usuário SMTP.                                                              |
| `SMTP_PASS`                | Não         | Senha ou senha de app do SMTP.                                             |
| `NEXT_PUBLIC_CONTACT_EMAIL`| Não         | E-mail público exibido no site. Padrão: `cdmjiujitsu@gmail.com`.           |
| `NEXT_PUBLIC_INSTAGRAM_URL`| Não         | Instagram da Comissão. Padrão: `https://www.instagram.com/cdmjj/`.         |
| `NEXT_PUBLIC_SITE_URL`     | Recomendada | URL pública do site, usada em metadados, canonical e Open Graph.           |
| `RATE_LIMIT_SALT`          | Recomendada | Segredo para anonimizar o IP no limite de tentativas.                      |

\* Obrigatória quando há um provedor de envio configurado.

## Segurança e privacidade

- Modo anônimo é o padrão; nome, e-mail e telefone são descartados no servidor quando esse modo está ativo.
- Idade e relato são obrigatórios; o consentimento com o aviso de privacidade também.
- Validação no cliente e no servidor com Zod.
- Honeypot contra robôs e limite de 5 envios a cada 10 minutos por IP (hash com salt).
- Limite de 32 KB por requisição.
- `/denuncia` e `/api/*` com `noindex, nofollow` e `Cache-Control: no-store`.
- Cabeçalhos de segurança e CSP em produção.
- Sem cookies de publicidade, analytics ou rastreamento de terceiros.

O limite de tentativas em memória é adequado a uma única instância. Em ambientes com várias instâncias/serverless, use um armazenamento compartilhado (por exemplo, Upstash Redis) para manter o limite efetivo.

## Antes de publicar

- [ ] Configurar `SMTP_PASS` ou `RESEND_API_KEY` e testar um envio real.
- [ ] Definir `NEXT_PUBLIC_SITE_URL` com o domínio oficial.
- [ ] Revisar o aviso de privacidade com responsável jurídico/encarregado de dados (LGPD).
- [ ] Definir prazo de retenção e procedimento de eliminação dos e-mails recebidos.
- [ ] Confirmar o e-mail oficial e quem terá acesso à caixa de entrada.
- [ ] Testar o formulário em celular e desktop após o deploy.

## Estrutura principal

```text
src/app/page.tsx                  Página inicial
src/app/denuncia/page.tsx         Canal de Denúncias
src/app/privacidade/page.tsx      Aviso de privacidade
src/app/api/denuncia/route.ts     Recebimento, validação e rate limit
src/components/denuncia-form.tsx  Formulário
src/lib/denuncia-schema.ts        Schema Zod
src/lib/email.ts                  Template e envio (Resend/SMTP)
src/lib/rate-limit.ts             Limite de tentativas em memória
src/components/site-header.tsx    Cabeçalho vermelho com logo centralizada
src/components/site-footer.tsx    Rodapé centralizado com Instagram e contato
```

## Contato e redes

- E-mail: `cdmjiujitsu@gmail.com`
- Instagram: [@cdmjj](https://www.instagram.com/cdmjj/)
- Emergência: Polícia **190** · Central de Atendimento à Mulher **180**
