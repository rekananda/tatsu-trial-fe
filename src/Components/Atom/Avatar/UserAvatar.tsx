
import { PropBaseT } from "@/types";
import { getInitial } from "@/utils/formatting";
import { FlexProps, MantineColor, MantineSize, Stack, TextProps, useMantineColorScheme } from "@mantine/core";
import { Avatar, Flex, Text } from "@mantine/core";
import { ReactNode } from "react";

export type AvatarDataT = {
  alt:string,
  photo?: string,
  subtitle?: string,
  title: string | ReactNode,
}

type PropsUserAvatar = {
  data: AvatarDataT
  size?: MantineSize | number;
  align?: "row"|"column";
  withPhoto?: boolean;
  withText?: boolean;
  color?: MantineColor;
  maw?: number;
  useInitial?: boolean;
} & PropBaseT & FlexProps

const UserAvatar = (props: PropsUserAvatar) => {
  const { colorScheme } = useMantineColorScheme();
  const { data, size, align = "row", color= colorScheme === "dark"? "white":"dark", maw, withPhoto = true, withText=true, useInitial = false, ...rest } = props
  const titleProps:TextProps = {
    className: "font-body",
    c: color,
    lineClamp: maw ? 1:2,
    style: {wordBreak:"break-all"}
  };
  const subTitleProps:TextProps = {
    className: `font-subtitle`,
    c: color,
    lineClamp: maw ? 1:2
  };

  return (
    <Flex direction={align} gap={8} align={data.subtitle && align !== "column" ? "start":"center"} {...rest}>
      {withText && <Stack gap={2} align={"start"} maw={maw} style={{overflowWrap: "anywhere"}}>
        <Text {...titleProps}>
          {data.title}
        </Text>
        {data.subtitle && <Text {...subTitleProps}>{data.subtitle}</Text>}
      </Stack>}
      {withPhoto && <Avatar src={data.photo} alt="no image here" radius={"xl"} color={color} variant="outline" size={size}>
        {useInitial && getInitial(data.alt)}
      </Avatar>}
    </Flex>
  )
}

export default UserAvatar;