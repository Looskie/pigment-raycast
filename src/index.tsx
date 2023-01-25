import { Action, ActionPanel, List } from "@raycast/api";
import color from "color";
import { useMemo, useState } from "react";
import { fetchColor } from "./utils/Color";

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const activeColor = useMemo(() => {
    try {
      return color(searchText.toLowerCase());
    } catch (error) {
      return null;
    }
  }, [searchText]);

  return (
    <List isShowingDetail onSearchTextChange={setSearchText} searchBarPlaceholder="Enter hex, rgb, hsl, or color name">
      <List.Section title="Results">
        {activeColor !== null ? (
          <List.Item
            title={searchText}
            subtitle={activeColor.isDark() ? "(Darker)" : "(Lighter)"}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard title="Copy Color (HEX)" content={activeColor.hex()} />
                <Action.CopyToClipboard title="Copy Color (RGB)" content={activeColor.rgb().toString()} />
                <Action.CopyToClipboard title="Copy Color (HSL)" content={activeColor.hsl().toString()} />
              </ActionPanel>
            }
            detail={
              <List.Item.Detail
                markdown={`<img src="${fetchColor(activeColor.hex())}" width="100%" height="100%" />`}
                metadata={
                  <List.Item.Detail.Metadata>
                    <List.Item.Detail.Metadata.Label title="Name" text={activeColor.toString()} />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label title="Hex" text={activeColor.hex()} />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label title="RGB" text={activeColor.rgb().toString()} />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label title="HSL" text={activeColor.hsl().toString()} />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label
                      title="Dark/Light"
                      text={activeColor.isDark() ? "Dark" : "Light"}
                    />
                  </List.Item.Detail.Metadata>
                }
              />
            }
          />
        ) : null}
      </List.Section>
    </List>
  );
}
