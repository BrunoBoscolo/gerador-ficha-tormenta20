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

  test('Deve ter as habilidades de escolha descritas', () => {
    const nomesHabilidades = DUENDE.abilities.map(a => a.name);
    expect(nomesHabilidades).toContain('Natureza');
    expect(nomesHabilidades).toContain('Tamanho');
    expect(nomesHabilidades).toContain('Dons');
    expect(nomesHabilidades).toContain('Presentes de Magia e de Caos');
  });

  test('Deve incluir as três limitações obrigatórias', () => {
    const nomesHabilidades = DUENDE.abilities.map(a => a.name);
    expect(nomesHabilidades).toContain('Aversão a Ferro');
    expect(nomesHabilidades).toContain('Aversão a Sinos');
    expect(nomesHabilidades).toContain('Tabu');
  });
});
