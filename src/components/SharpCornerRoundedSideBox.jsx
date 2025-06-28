import React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop, Image} from 'react-native-svg';

const CustomSvgWithImage = ({
  width = 100,
  height = 100,
  imageUri,
  imageWidth = 60,
  imageHeight = 60,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      {/* Background Path */}
      <Path
        // d="M10.3448 8.96226L17.288 6.37675C24.4541 3.70824 31.9239 1.94009 39.5259 1.11291V1.11291C46.3234 0.373258 53.182 0.390809 59.9757 1.16524L60.7585 1.25447C67.1996 1.98873 73.5535 3.3512 79.7294 5.32244L91.133 8.96226L94.546 19.2335C96.8611 26.2005 98.3879 33.4051 99.0977 40.7123L99.1284 41.0282C99.7082 46.9959 99.721 53.0053 99.1668 58.9755V58.9755C98.4118 67.1087 96.6099 75.1105 93.8057 82.7823L91.133 90.0943L82.2902 93.5216C74.4308 96.5678 66.1846 98.5016 57.7903 99.2671L57.1903 99.3218C52.2424 99.773 47.2641 99.7833 42.3144 99.3524V99.3524C32.892 98.5322 23.6765 96.1226 15.0586 92.2258L10.3448 90.0943L8.03158 85.172C3.69997 75.9549 1.11496 66.0145 0.407625 55.8548V55.8548C0.136219 51.9565 0.142522 48.0439 0.426487 44.1465L0.441842 43.9358C1.12775 34.5218 3.37053 25.2868 7.07886 16.6068L10.3448 8.96226Z"
        // fill="url(#paint0_linear)"
      />
      {/* Image in the Center */}
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
