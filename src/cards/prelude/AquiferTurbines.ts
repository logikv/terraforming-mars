import {Tags} from '../Tags';
import {Player} from '../../Player';
import {Game} from '../../Game';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {PlaceOceanTile} from '../../deferredActions/PlaceOceanTile';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';
import {CardMetadata} from '../CardMetadata';
import {CardRenderer} from '../render/CardRenderer';

export class AquiferTurbines extends PreludeCard implements IProjectCard {
    public tags = [Tags.ENERGY];
    public name = CardName.AQUIFER_TURBINES;
    public canPlay(player: Player, _game: Game) {
      return player.canAfford(3);
    }
    public play(player: Player, game: Game) {
      player.addProduction(Resources.ENERGY, 2);
      game.defer(new PlaceOceanTile(player, game));
      game.defer(new SelectHowToPayDeferred(player, 3, false, false));
      return undefined;
    }
    public metadata: CardMetadata = {
      cardNumber: 'P02',
      renderData: CardRenderer.builder((b) => {
        b.oceans(1).productionBox((pb) => pb.energy(2)).br;
        b.minus().megacredits(3);
      }),
      description: 'Place an Ocean. Increase your energy production 2 steps. Pay 3 MC.',
    }
}

