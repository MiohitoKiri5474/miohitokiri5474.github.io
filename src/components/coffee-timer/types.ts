export interface Block {
  id: string;
  time: number | string;
  water: number | string;
  notice?: string;
  step?: string;
}

export interface Recipe {
  title: string;
  blocks: Block[];
  notice?: string[];
}
