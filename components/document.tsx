import type { SetStateAction } from 'react';

import type { UIBlock } from './block';
import { FileIcon, LoaderIcon, MessageIcon, PencilEditIcon } from './icons';
import {Paintbrush} from 'lucide-react'
const getActionText = (
  type: 'create' | 'update' | 'request-suggestions'|"functionDesign"|"diagram",
  tense: 'present' | 'past',
) => {
  switch (type) {
    case 'create':
      return tense === 'present' ? 'Creating' : 'Created';
    case 'update':
      return tense === 'present' ? 'Updating' : 'Updated';
    case 'request-suggestions':
      return tense === 'present'
        ? 'Adding suggestions'
        : 'Added suggestions to';
    case "functionDesign":
      return tense === 'present'?"Designing":"Designed"
    case "diagram":
      return tense === 'present'?"Drawing":"Drawn"
    default:
      return null;
  }
};

interface DocumentToolResultProps {
  type: 'create' | 'update' | 'request-suggestions'|'functionDesign'|"diagram";
  result: { id: string; title: string };
  block: UIBlock;
  setBlock: (value: SetStateAction<UIBlock>) => void;
}

export function DocumentToolResult({
  type,
  result,
  setBlock,
}: DocumentToolResultProps) {
  return (
    <button
      type="button"
      className="bg-background cursor-pointer border py-2 px-3 rounded-xl w-fit flex flex-row gap-3 items-start"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        const boundingBox = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };

        setBlock({
          documentId: result.id,
          content: '',
          sequenceDiagram:"",
          title: result.title,
          isVisible: true,
          status: 'idle',
          boundingBox,
        });
      }}
    >
      <div className="text-muted-foreground mt-1">
        {type === 'create' ? (
          <FileIcon />
        ) : type === 'update' ? (
          <PencilEditIcon />
        ) : type === 'request-suggestions' ? (
          <MessageIcon />
        ) :type === 'functionDesign' ? (
          <Paintbrush size={16}  />
        ) :type === 'diagram' ? (
          <Paintbrush size={16}  />
        ) : null}
      </div>
      <div className="text-left">
        {`${getActionText(type, 'past')} "${result.title}"`}
      </div>
    </button>
  );
}

interface DocumentToolCallProps {
  type: 'create' | 'update' | 'request-suggestions'|'functionDesign';
  args: { title: string };
  setBlock: (value: SetStateAction<UIBlock>) => void;
}

export function DocumentToolCall({
  type,
  args,
  setBlock,
}: DocumentToolCallProps) {
  return (
    <button
      type="button"
      className="cursor pointer w-fit border py-2 px-3 rounded-xl flex flex-row items-start justify-between gap-3"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        const boundingBox = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };

        setBlock((currentBlock) => ({
          ...currentBlock,
          isVisible: true,
          boundingBox,
        }));
      }}
    >
      <div className="flex flex-row gap-3 items-start">
        <div className="text-zinc-500 mt-1">
          {type === 'create' ? (
            <FileIcon />
          ) : type === 'update' ? (
            <PencilEditIcon />
          ) : type === 'request-suggestions' ? (
            <MessageIcon />
          ) :type === 'functionDesign' ? (
            <Paintbrush size={16} />
          )  :type === 'diagram' ? (
            <Paintbrush size={16}  />
          ): null}
        </div>

        <div className="text-left">
          {`${getActionText(type, 'present')} ${args.title ? `"${args.title}"` : ''}`}
        </div>
      </div>

      <div className="animate-spin mt-1">{<LoaderIcon />}</div>
    </button>
  );
}
