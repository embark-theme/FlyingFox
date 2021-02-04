import React, { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import CodeBlock from './code-block';
import ButtonPair from '../button-pair';
import data from '../../data';

function CodeView({
  darkMain,
  lightMain,
  otherMain,
  darkPrivate,
  lightPrivate,
  otherPrivate,
  theme,
  sidebarType,
  sidebarWidth,
  sidebarCollapsedWidth,
  includes,
}) {
  let files = ['config.css', 'tree-style-tab.css', 'window-controls'];
  const [currentFile, setCurrentFile] = useState(0);
  let syntaxHighlightStyle = data.syntaxHighlight(
    theme.dark,
    theme.darkPalette,
    theme.light,
    theme.other.accent,
    theme.other.yellow,
    theme.other.green,
    theme.other.red
  );
  let includeSidebarType = data.configSidebarType(sidebarType);
  let includeExtensionIcons = includes.extensionIcons
    ? data.includeExtensionIcons
    : '';
  let includeHideTabline = includes.hideTabline ? data.includeHideTabline : '';
  let includeWindowControls = includes.windowControls
    ? data.includeWindowControls(includes.hideTabline)
    : '';
  let mainColors = data.configColors(
    darkMain.color,
    darkMain.palette,
    lightMain.color,
    lightMain.palette,
    otherMain.accent,
    otherMain.yellow,
    otherMain.green,
    otherMain.red,
    darkMain.mask
  );
  let configMain = data.configMain(sidebarWidth, sidebarCollapsedWidth);
  let privateColors = data.configColors(
    darkPrivate.color,
    darkPrivate.palette,
    lightPrivate.color,
    lightPrivate.palette,
    otherPrivate.accent,
    otherPrivate.yellow,
    otherPrivate.green,
    otherPrivate.red,
    darkPrivate.mask
  );
  console.log(darkMain.mask);
  let config = `/* order of these files is important and should not be changed */

${includeExtensionIcons}${includeWindowControls}${includeHideTabline}${includeSidebarType}
:root { ${mainColors}
    ${configMain}
    ${data.configUnset}
}

:root[privatebrowsingmode="temporary"]{ ${privateColors} 
}`;

  return (
    <VStack
      padding="8"
      w="90%"
      spacing="4"
      m="0 auto"
      mt={2}
      fontFamily="monospace"
    >
      <ButtonPair
        content={files}
        bgSelected={[theme.darkPalette[1], theme.darkPalette[2]]}
        color={{ selected: theme.light, regular: theme.dark }}
        selected={currentFile}
        onClick={setCurrentFile}
      />
      <CodeBlock
        dark={theme.dark}
        darkPalette={theme.darkPalette}
        light={theme.light}
        style={syntaxHighlightStyle}
        code={config}
        name="config.css"
      />
    </VStack>
  );
}

export default CodeView;