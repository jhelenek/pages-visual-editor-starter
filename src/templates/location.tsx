import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { Config, Render } from "@measured/puck";
import { config as puckConfig } from "../puck/puck.config";

export const config: TemplateConfig = {
  stream: {
    $id: "location-stream",
    filter: {
      entityTypes: ["location"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "slug",
    ],
    localization: {
      locales: ["en"],
    },
  },
};

// Right now location entity data isn't used
export const transformProps = async (data) => {
  const { document } = data;
  try {
    const visualTemplate = JSON.parse(document?._site?.c_templateVisualConfiguration);
    return {
      ...data,
      document: {
        ...document,
        visualTemplate,
      },
    }
  } catch (error) {
    console.error("Failed to parse visualTemplate: " + error);
    return data;
  }
}

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
        },
      },
    ],
  };
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

const Location: Template<TemplateRenderProps> = ({ document }) => {
  const { visualTemplate } = document;
  return <Render config={puckConfig as Config} data={visualTemplate}/>;
};

export default Location;
