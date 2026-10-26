# Arbitra: como colocar no ar

Site estático (HTML + JS) com login e banco de dados no Firebase. Funciona no navegador do computador e do celular.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app inteiro (visual e funcionamento). **No topo do script fica o `firebaseConfig`, que você preenche** |
| `Abrir_Local.bat` | Abre o app no seu PC por um servidor local (para testar o login antes de publicar) |
| `termos.html`, `privacidade.html`, `legal-config.js` | Termos de uso e Política de privacidade |
| `firestore.rules` | Regras de segurança do banco |
| `icons/` | Ícone da aba do navegador |
| `firebase.json` | Só se for hospedar no Firebase Hosting |

## 1. Criar o projeto no Firebase (uns 10 minutos)

1. Acesse https://console.firebase.google.com e clique em **Adicionar projeto** (ex.: `arbitra`). O Google Analytics é opcional.
2. **Authentication** > Começar > aba **Sign-in method**: ative **E-mail/senha** e **Google**.
3. **Firestore Database** > Criar banco de dados > modo **produção** > região `southamerica-east1` (São Paulo).
4. Na aba **Regras** do Firestore, apague o que tiver, cole o conteúdo de `firestore.rules` e clique em **Publicar**.
5. Engrenagem > **Configurações do projeto** > Seus apps > ícone **</>** (Web). Dê um nome e registre. **Não** precisa marcar Firebase Hosting.
6. Copie o objeto `firebaseConfig` que aparece. Abra `index.html` num editor (Bloco de Notas ou VS Code), procure `CONFIGURAÇÃO DO FIREBASE` e troque os valores de exemplo pelos seus.

A `apiKey` do Firebase pode ficar no código do site: ela identifica o projeto e não dá acesso a nada. Quem protege os dados são as regras do passo 4.

## Testar no computador

- **Dois cliques no `index.html`**: abre e a demonstração funciona. O login pode falhar, porque o Firebase não aceita páginas abertas direto do disco.
- **`Abrir_Local.bat`** (precisa de Python): abre em `http://localhost:8080`, onde o login funciona, porque o Firebase já autoriza `localhost` por padrão.

## 2. Publicar

### Opção A: Vercel (como o seu Controle Financeiro)
1. Em https://vercel.com > **Add New… > Project**, suba esta pasta (pelo GitHub ou arrastando a pasta com `vercel deploy`).
2. Framework: **Other**. Não há comando de build.
3. Depois do deploy, copie o domínio (ex.: `arbitra.vercel.app`).

### Opção B: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase use --add            # escolha o projeto
firebase deploy               # publica o site e as regras
```

### Depois de publicar (obrigatório para o login funcionar)
Firebase > **Authentication > Settings > Domínios autorizados** > **Adicionar domínio** > cole o domínio do site (ex.: `arbitra.vercel.app`). Sem isso, o login com Google mostra erro de domínio não autorizado.

## 3. Virar administrador (para editar o catálogo de clones)

1. Crie sua conta no site normalmente.
2. Firebase > **Authentication > Users**: copie o **UID** da sua conta.
3. **Firestore** > Iniciar coleção > ID da coleção: `admins` > ID do documento: **cole o UID** > adicione um campo qualquer (ex.: `nome` = `Oliver`) > Salvar.
4. Recarregue o site. Em **Perfil** aparece "Administrador" e, em **Casas clones**, os botões de cadastrar e importar.

Para importar a lista de clones de uma vez, use **Casas clones > Importar / exportar catálogo (JSON)**:

```json
[
  {"nome": "Casa A", "provedor": "Plataforma X", "risco": "alto", "cartoes": 3, "pagamento": "Pix · até 1h", "notas": "Limita rápido"},
  {"nome": "Casa B", "provedor": "Plataforma X", "risco": "medio"}
]
```

Todos os usuários logados veem o catálogo; só administradores alteram.

## Onde ficam os dados

```
users/{uid}                  saldos, bancos, gastos, metas, notas, preferências (só o dono lê/escreve)
users/{uid}/months/{AAAA-MM} apostas daquele mês (só o dono lê/escreve)
catalog/main                 catálogo de casas clones (todos leem, admins escrevem)
admins/{uid}                 quem é administrador (só pelo console)
```

## Publicar uma atualização

1. Substitua os arquivos alterados (no GitHub, a Vercel publica sozinha).
2. Quem estiver com o site aberto vê a versão nova ao recarregar a página (Ctrl+F5 força).

## Termos de uso e Política de privacidade

As páginas `termos.html` e `privacidade.html` já estão prontas e linkadas no login, no cadastro e no Perfil. Antes de publicar:

1. Abra `legal-config.js` e preencha nome ou razão social, CPF/CNPJ, e-mail de contato, cidade/UF e o endereço do site. Enquanto um campo estiver vazio, ele aparece destacado em amarelo nas páginas.
2. Se usar outro provedor além do Firebase e da Vercel (ex.: ferramenta de análise de acesso, e-mail marketing), acrescente na seção 3 da política.
3. Quando mudar algo relevante, atualize a data em `vigencia`.

Os textos são um modelo baseado na LGPD, no Marco Civil da Internet e no Código de Defesa do Consumidor. Vale uma revisão por advogado antes de abrir o site ao público, principalmente se você for cobrar pelo serviço.

## Antes de divulgar

- O plano gratuito do Firebase (Spark) aguenta bem o começo: 50 mil leituras e 20 mil gravações por dia.
- Em Authentication > Templates, traduza o e-mail de redefinição de senha para português.
