import { GS } from '@lib';
import { NamedRange } from '@utils/constants';

export const help = () => {
  const helpVideoRange = GS.ss.getRangeByName(NamedRange.HelpVideoUrl);

  helpVideoRange.activate();
  GS.ssui.alert(`Assista ao vídeo: ${helpVideoRange.getValue()}`);
};
