export function loginSession() {
    const email = Cypress.env('email');
    const password = Cypress.env('password');

    // Use o método cy.session com um identificador único e o setup
    cy.session([email, password], () => {
        cy.visit("/entrar");
        cy.get('#email', {log: false}).type(email, {log: false});
        cy.get('#senhaLogin', {log: false}).type(password, {log: false});
        cy.get('#entrar').click();
        cy.get('#frmTabela\\:dtTabela_data tr:nth-child(1) td:nth-child(4) a').click();
    });
}

export function login() {
    // Acesse variáveis de ambiente
    const email = Cypress.env('email');
    const password = Cypress.env('password');
        cy.visit("/entrar");
        cy.get('#email', {log: false}).type(email, {log: false});
        cy.get('#senhaLogin', {log: false}).type(password, {log: false});
        cy.get('#entrar').click();   

         // Verifica para qual URL o usuário foi redirecionado
        cy.url().then((url) => {
        if (url.includes('/selecao-empresa')) {
            cy.log('Usuário redirecionado para a página de seleção de empresa');
            clicarBotaoAcessar(cnpj);
        } else if (url.includes('/dashboard')) {
            cy.log('Usuário redirecionado para o dashboard');
        } else {
            cy.log('Usuário redirecionado para uma URL inesperada: ' + url);
        }
    });
}

function clicarBotaoAcessar(cnpj) {
    // Encontra o label que contém o CNPJ específico
    cy.contains('label', cnpj).parents('tr').within(() => {
        cy.contains('a', 'Acessar').click();
    });
}


export function registerProduct(barra, nome, marca, custo, margemVenda, ncm) {
    cy.get('#menu > div.menu-corpo > ul > li:nth-child(2) > a > span').click();
    cy.get('#menu > div.menu-corpo > ul > li:nth-child(2) > ul > li:nth-child(3) > a > span').click();
    cy.get('#frmTabela > div.ga-display-md-flex.ga-justify-content-between.ga-align-items-center > div.ga-mb-4.ga-text-md-right > div > a').click();
    cy.get('#frmTabelaProd\\:barra').type(barra);
    cy.get('#frmTabelaProd\\:nome').type(nome);
    cy.get('#frmTabelaProd\\:marca').type(marca);
    cy.get('#frmTabelaProd\\:vlcusto').clear().type(custo);
    cy.wait(1000);

    cy.get('#frmTabelaProd\\:margemVenda').clear();
    cy.wait(500);

    cy.get('#frmTabelaProd\\:margemVenda').type(margemVenda).then($input => {
        cy.wrap($input)
            .blur(); // Simula a perda de foco
    });


    cy.wait(500);
    cy.get('#frmTabelaProd\\:ncm').clear().type(ncm);
    cy.get('#frmTabelaProd\\:ncm').should('have.value', ncm);
}


export function registerGrades(variante, variacao, variante1, variacao1, codBarra, valorVenda){
    cy.contains('a', 'Grade').click()
    cy.get('#frmGrade\\:allVariante').find('div.ui-selectonemenu-trigger').click();
    cy.get('#frmGrade\\:allVariante').should('be.visible');
    cy.wait(1000);
    cy.get('#frmGrade\\:allVariante_items').contains('li.ui-selectonemenu-item', variante).click();
    cy.wait(1000);
    cy.get('#frmGrade\\:j_idt868 > div.ui-selectonemenu-trigger.ui-state-default.ui-corner-right > span').click();
    cy.get('#frmGrade\\:j_idt868').should('be.visible');
    cy.wait(1000);
    cy.get('#frmGrade\\:j_idt868_items').contains('li.ui-selectonemenu-item', variacao).click();
    cy.get('#frmGrade\\:j_idt877').click();

    cy.get('#frmGrade\\:allVariante1 > div.ui-selectonemenu-trigger.ui-state-default.ui-corner-right > span').click();
    cy.get('#frmGrade\\:allVariante1').should('be.visible');
    cy.wait(1000);
    cy.get('#frmGrade\\:allVariante1_items').contains('li.ui-selectonemenu-item', variante1).click();
    cy.wait(1000);
    cy.get('#frmGrade\\:j_idt1121 > div.ui-selectonemenu-trigger.ui-state-default.ui-corner-right > span').click();
    cy.get('#frmGrade\\:j_idt1121').should('be.visible');
    cy.wait(1000);
    cy.get('#frmGrade\\:j_idt1121_items').contains('li.ui-selectonemenu-item', variacao1).click();

    
    cy.get('#frmGrade\\:j_idt883').type(codBarra);

    cy.get('#frmGrade\\:valorcusto').clear().type(valorVenda);

    cy.wait(1000);
    cy.get('#frmGrade\\:j_idt891').click();

    cy.wait(1000);
    cy.get('#j_idt998').click();
    
}

export function registerEtapa(etapa, descEtapa, descComplemento, valor){
    cy.wait(1000);
    cy.get('#frmTabelaProd\\:j_idt271').should('be.visible').click();
    cy.wait(500);
    cy.get('#frmDialogs\\:j_idt1064_input').type(etapa);
    cy.get('#frmDialogs\\:complementoItemEtapaDescricao').type(descEtapa);
    cy.get('#frmDialogs\\:j_idt1072').type(descComplemento)
    cy.wait(1000);
    cy.get('#frmDialogs\\:j_idt1076').clear().type(valor);
    cy.get('#frmDialogs\\:j_idt1086').click();
    cy.get('#frmDialogs\\:j_idt1107').click();
}

export function addEtapa(etapa, descComplemento, valor) {
    cy.get('#frmTabelaProd\\:j_idt271').should('be.visible').click();
    cy.get('#frmDialogs\\:j_idt1064 > button > span.ui-button-icon-primary.ui-icon.ui-icon-triangle-1-s').should('be.visible').click();

    cy.get('#frmDialogs\\:j_idt1064_panel').should('be.visible');

    cy.get('#frmDialogs\\:j_idt1064_panel').contains('tr.ui-autocomplete-item', etapa).should('be.visible').click();
    cy.get('#frmDialogs\\:j_idt1072').type(descComplemento);
    cy.wait(1000);
    cy.get('#frmDialogs\\:j_idt1076').clear().type(valor);
    cy.get('#frmDialogs\\:j_idt1086').click();

    // Usar force: true para clicar no botão mesmo que esteja coberto
    cy.get('#frmDialogs\\:j_idt1107').click({ force: true });
}


export function saveProduct(){
    cy.contains('#frmTabelaProd\\:salva > .ui-button-text', 'Salvar').should('be.visible').wait(1000);
    cy.get('#frmTabelaProd\\:salva > .ui-button-text').click();

}

//APENAS PARA ESTUDO
export function inactivateProducts(){

    it('', () => {
        
    });
    cy.get('#menu > div.menu-corpo > ul > li').contains('span.menu-lista-texto', 'Cadastros').click();
    cy.get('#menu > div.menu-corpo > ul > li').contains('span.menu-lista-texto', 'Cadastros > ul > li').find('#menu-lista-nivel-2-link > span.menu-lista-nivel-2-texto','Produto').click();
    //cy.get('#menu > div.menu-corpo > ul > li:nth-child(2) > ul > li:nth-child(3) > a > span').click();
    cy.get('#frmTabela\\:busca').type("%%%");
    cy.get('#frmTabela\\:j_idt93').click();
    cy.get('#frmTabela\\:dtTabela\\:j_idt90 > div > div.ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default').click();
    cy.get('#frmTabela\\:dtTabela_data > tr:nth-child(1) > td.ui-selection-column.ui-column-p-3 > div > div.ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default.ui-state-active').click();
    cy.get('#frmTabela\\:btnMaisOpcoes').click();
    cy.get('#frmTabela\\:j_idt75 > ul > li:nth-child(1) > a > span.ui-menuitem-text').should('be.visible').click();
    cy.get('#frmConfirm\\:j_idt211').should('be.visible').click();

}