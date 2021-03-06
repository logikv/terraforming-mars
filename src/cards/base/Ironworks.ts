import {IActionCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Game} from '../../Game';
import {CardName} from '../../CardName';
import {MAX_OXYGEN_LEVEL, REDS_RULING_POLICY_COST} from '../../constants';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {CardMetadata} from '../CardMetadata';
import {CardRenderer} from '../render/CardRenderer';

export class Ironworks implements IActionCard, IProjectCard {
    public cost = 11;
    public tags = [Tags.STEEL];
    public name = CardName.IRONWORKS;
    public cardType = CardType.ACTIVE;

    public play(_player: Player, _game: Game) {
      return undefined;
    }
    public canAct(player: Player, game: Game): boolean {
      const hasEnoughEnergy = player.energy >= 4;
      const oxygenMaxed = game.getOxygenLevel() === MAX_OXYGEN_LEVEL;

      if (PartyHooks.shouldApplyPolicy(game, PartyName.REDS) && !oxygenMaxed) {
        return player.canAfford(REDS_RULING_POLICY_COST) && hasEnoughEnergy;
      }

      return hasEnoughEnergy;
    }
    public action(player: Player, game: Game) {
      player.energy -= 4;
      player.steel++;
      return game.increaseOxygenLevel(player, 1);
    }
    public metadata: CardMetadata = {
      cardNumber: '101',
      renderData: CardRenderer.builder((b) => {
        b.effectBox((eb) => {
          eb.energy(4).digit.startAction.steel(1).oxygen(1);
          eb.description('Action: Spend 4 energy to gain 1 steel and raise oxygen 1 step.');
        });
      }),
    };
}
