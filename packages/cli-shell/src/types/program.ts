export type ProgramArgumentLike = {
  required?: boolean;
  name: () => string;
};

export type ProgramCommandLike = {
  name: () => string;
  description: () => string;
  registeredArguments?: readonly ProgramArgumentLike[];
};

export type ProgramLike = {
  command: (spec: string) => { description: (text: string) => unknown };
  name: () => string;
  description: () => string;
  commands: readonly ProgramCommandLike[];
};
