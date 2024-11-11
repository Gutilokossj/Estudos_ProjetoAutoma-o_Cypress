describe('Testes de estudo', () => {

    beforeEach(() => {

        // Popula o localStorage com a key e value desejados antes de carregar a página
        cy.visit('https://dev-finance.netlify.app/', {
            onBeforeLoad(win) {
                win.localStorage.setItem(
                    'dev.finances:transactions',
                    JSON.stringify([
                        { description: 'Teste 1', amount: 2000, date: '08/11/2024' },
                        { description: 'TESTE2', amount: -200, date: '08/11/2024' }
                    ])
                );
            }
        });
    });

    it('Remover entradas e saídads', () => {

        cy.log('Estratégia 1: voltar para elemento pai e avançar para um td img atributo')
        cy.get('td.description')
            .contains('TESTE2')
            .parent()
            .find('img[onclick*=remove]');

        cy.log('Estratégia 2: buscar todos os irmaos e buscar o que tem img + atributo')
        cy.get('td.description')
            .contains('TESTE2')
            .siblings()
            .children('img[onclick*=remove]');

        cy.log('Estratégia 3: buscar todos os irmãos, e filtrar pelo que tem img + atributo')
        cy.get('td.description')
            .contains('TESTE2')
            .siblings()
            .children()
            .filter('img[onclick*=remove]');

        cy.log('Estratégia 4: buscar todos os irmaos mais velhos, seleciona o caçula e busca seu filho img')
        cy.get('td.description')
            .contains('TESTE2')
            .nextAll()
            .eq(2) //td //Poderia usar .last se quiser pegar o último elemento ou .fist pra pegar o primeiro
            .find('img');
    });
    
});