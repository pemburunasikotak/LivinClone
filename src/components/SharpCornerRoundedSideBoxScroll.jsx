import React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop, Image} from 'react-native-svg';

const CustomSvgWithImage = ({
  width = 85,
  height = 85,
  imageUri,
  imageWidth = 70,
  imageHeight = 70,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
      />
      {imageUri && (
        <Image
          href={imageUri}
          x={(100 - imageWidth) / 2}
          y={(100 - imageHeight)}
          width={imageWidth}
          height={imageHeight}
          preserveAspectRatio="xMidYMid slice"
          resizeMode="contain"
        />
      )}
    </Svg>
  );
};

export default CustomSvgWithImage;
