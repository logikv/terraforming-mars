import {expect} from 'chai';
import {LunarExports} from '../../../src/cards/colonies/LunarExports';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestingUtils';

describe('LunarExports', function() {
  it('Should play', function() {
    const card = new LunarExports();
    const player = TestPlayers.BLUE.newPlayer();
    const orOptions = card.play(player) as OrOptions;
    expect(orOptions).is.not.undefined;
    expect(orOptions instanceof OrOptions).is.true;
    orOptions.options[0].cb();
    expect(player.getProduction(Resources.PLANTS)).to.eq(2);
  });
});
