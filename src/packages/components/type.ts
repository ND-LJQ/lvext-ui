/*
 * @Author: ND_LJQ
 * @Date: 2022-11-24 12:04:15
 * @LastEditors: ND_LJQ
 * @LastEditTime: 2022-12-02 15:26:32
 * @Description:
 * @Email: ndliujunqi@outlook.com
 */
type contributionStyle = {
  [key: string]: any;
  svgWidth?: number;
  svgHeight?: number;
  colDistance?: number;
  rowDistance?: number;
  rectWidth?: number;
  rectHeight?: number;
  rectRoundX?: number;
  rectRoundY?: number;
};

type SimpleKeyValueObject = {
  [key: string]: any;
};

export type { contributionStyle, SimpleKeyValueObject };
