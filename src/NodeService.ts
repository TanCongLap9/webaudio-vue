import { Node2 } from './models/Node2';
import type { Reactive } from 'vue';
import type { Pos } from './ts/Pos';
import { NodeType } from './ts/NodeType';
import { SelectMode } from './ts/SelectMode';
import type { NodeTypeWithId } from './ts/NodeTypeWithId';

export class NodeService {
  nodes: NodeTypeWithId[] = [{id: 0, nodeType: NodeType.Main}];
  selectMode = SelectMode.MOVE;
  holding: Reactive<Pos> | null = null;
  initialX: number = 0;
  initialY: number = 0;
  newId = 1;
  nodeToConnect: Node2<AudioNode | AudioContext> | null = null;
}