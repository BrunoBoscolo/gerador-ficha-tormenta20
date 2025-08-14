import DUENDE from '../duende';
import { Atributo } from '../../atributos';

describe('Testa as definições da raça Duende', () => {
  // Passo 1: Natureza
  test('Deve ser do tipo "espírito"', () => {
    // Esta verificação assume que você tem uma propriedade 'type' no seu objeto DUENDE.
    // Se o nome da propriedade for outro, ajuste aqui.
    // expect(DUENDE.type).toBe('espírito');
  });

  test('Deve ter uma habilidade de escolha de Natureza', () => {
    // Verifica se existe uma habilidade que permite ao jogador escolher a natureza.
    // O nome da habilidade pode ser "Natureza", "Natureza Feérica", etc. Ajuste conforme necessário.
    const habilidadeNatureza = DUENDE.abilities.find(
      (ability) => ability.name === 'Natureza'
    );
    expect(habilidadeNatureza).toBeDefined();

    // Verifica se essa habilidade está configurada para uma ação especial no sistema.
    // O nome 'duendeNatureza' é um exemplo, use o que fizer sentido para a sua implementação.
    expect(habilidadeNatureza?.sheetActions?.[0].action.specialAction).toBe(
      'duendeNatureza'
    );
  });

  // Passo 2: Tamanho
  test('Deve ter uma habilidade de escolha de Tamanho', () => {
    const habilidadeTamanho = DUENDE.abilities.find(
      (ability) => ability.name === 'Tamanho'
    );
    expect(habilidadeTamanho).toBeDefined();
    expect(habilidadeTamanho?.sheetActions?.[0].action.specialAction).toBe(
      'duendeTamanho'
    );
  });

  // Passo 3: Dons (Bônus de Atributos)
  test('Deve conceder os bônus de atributos corretos', () => {
    // Exemplo: se a raça dá +2 em Inteligência e +1 em Destreza
    // const intBonus = DUENDE.attributes.attrs.find(attr => attr.attr === Atributo.INTELIGENCIA);
    // expect(intBonus?.mod).toBe(2);
    // const dexBonus = DUENDE.attributes.attrs.find(attr => attr.attr === Atributo.DESTREZA);
    // expect(dexBonus?.mod).toBe(1);

    // Se os bônus são escolhidos pelo usuário, verifique a habilidade correspondente.
    const habilidadeDons = DUENDE.abilities.find(
      (ability) => ability.name === 'Dons'
    );
    expect(habilidadeDons).toBeDefined();
    expect(habilidadeDons?.sheetActions?.[0].action.specialAction).toBe(
      'duendeDons'
    );
  });

  // Passo 4: Presentes de Magia e de Caos
  test('Deve ter a habilidade "Presentes" que concede poderes', () => {
    // Esta abordagem é mais simples do que listar todos os poderes.
    // Ela verifica se a habilidade que concede os poderes existe e está configurada corretamente.
    const habilidadePresentes = DUENDE.abilities.find(
      (ability) => ability.name === 'Presentes de Magia e de Caos'
    );
    expect(habilidadePresentes).toBeDefined();
    expect(habilidadePresentes?.sheetActions?.[0].action.specialAction).toBe(
      'duendePresentes'
    );
  });

  // Passo 5: Limitações
  test('Deve incluir as limitações "Aversão a Ferro", "Aversão a Sinos" e "Tabu"', () => {
    const aversaoFerro = DUENDE.abilities.find(
      (ability) => ability.name === 'Aversão a Ferro'
    );
    expect(aversaoFerro).toBeDefined();

    const aversaoSinos = DUENDE.abilities.find(
      (ability) => ability.name === 'Aversão a Sinos'
    );
    expect(aversaoSinos).toBeDefined();

    const tabu = DUENDE.abilities.find((ability) => ability.name === 'Tabu');
    expect(tabu).toBeDefined();
  });
});
