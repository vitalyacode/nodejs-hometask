const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
  // TODO: Implement methods to work with fighters

  search(search) {
    const item = FighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
  create(fighterParam) {
    const { name } = fighterParam;

    if (!!this.getByName({ name })) {
      throw new Error('Fighter already exists');
    }
    const fighter = FighterRepository.create(fighterParam);
    return fighter;
  }
  update(id, fighterParam) {
    const { name } = fighterParam;
    if (!this.search({ id })) throw new Error('Fighter to update not found');

    if (fighterParam?.name && !!this.getByName({ name })) {
      throw new Error('Fighter name is already in use');
    }
    const fighter = FighterRepository.update(id, fighterParam);
    return fighter;
  }
  getAll() {
    const fighters = FighterRepository.getAll();
    return fighters;
  }
  getById(id) {
    const fighter = this.search({ id });
    if (!fighter) throw new Error('Fighter not found');
    return fighter;
  }

  getByName(name) {
    const item = FighterRepository.getOneFighter(name);
    if (!item) {
      return null;
    }
    return item;
  }

  delete(id) {
    if (!this.search({ id })) throw new Error('Fighter to delete not found');
    const fighter = FighterRepository.delete(id);
    return fighter;
  }
}

module.exports = new FighterService();
