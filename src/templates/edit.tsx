import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { Editor } from "../puck/editor";
import { DocumentProvider } from "../hooks/useDocument";
import useEntityDocumentQuery from "../hooks/queries/useEntityDocumentQuery";

export const config: TemplateConfig = {
  name: "edit",
};

// Editor is avaliable at /edit
export const getPath: GetPath<TemplateProps> = () => {
  return `edit`;
};

// Render the editor
const Edit: Template<TemplateRenderProps> = () => {
  const { entityDocument } = useEntityDocumentQuery({ templateId: "location", entityId: "cafe" });
  return (
    <DocumentProvider value={entityDocument?.response.document}>
      <Editor isLoading={!entityDocument}/>
    </DocumentProvider> 
  );
};

export default Edit;
