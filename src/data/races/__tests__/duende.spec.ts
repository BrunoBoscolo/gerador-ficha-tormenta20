import DUENDE from '../duende';

describe('Testa as definições da raça Duende', () => {
  test('Deve ter o nome "Duende"', () => {
    expect(DUENDE.name).toBe('Duende');
  });

  test('Deve ser do tipo Espírito', () => {
    const tipoHabilidade = DUENDE.abilities.find(
      (ability) => ability.name === 'Tipo de Criatura'
    );
    expect(tipoHabilidade).toBeDefined();
    expect(tipoHabilidade?.description).toContain('Espírito');
  });

  test('Não deve ter bônus de atributo base', () => {
    expect(DUENDE.attributes.attrs).toHaveLength(0);
  });

  test('Deve ter as habilidades de escolha com as specialActions corretas', () => {
    const natureza = DUENDE.abilities.find((a) => a.name === 'Natureza');
    expect(natureza?.sheetActions?.[0].action.specialAction).toBe('duendeNatureza');

    const tamanho = DUENDE.abilities.find((a) => a.name === 'Tamanho');
    expect(tamanho?.sheetActions?.[0].action.specialAction).toBe('duendeTamanho');

    const dons = DUENDE.abilities.find((a) => a.name === 'Dons');
    expect(dons?.sheetActions?.[0].action.specialAction).toBe('duendeDons');

    const presentes = DUENDE.abilities.find((a) => a.name === 'Presentes de Magia e de Caos');
    expect(presentes?.sheetActions?.[0].action.specialAction).toBe('duendePresentes');

    const tabu = DUENDE.abilities.find((a) => a.name === 'Tabu');
    expect(tabu?.sheetActions?.[0].action.specialAction).toBe('duendeTabu');
  });

  test('Deve incluir as três limitações obrigatórias', () => {
    const nomesHabilidades = DUENDE.abilities.map(a => a.name);
    expect(nomesHabilidades).toContain('Aversão a Ferro');
    expect(nomesHabilidades).toContain('Aversão a Sinos');
    expect(nomesHabilidades).toContain('Tabu');
  });
});
