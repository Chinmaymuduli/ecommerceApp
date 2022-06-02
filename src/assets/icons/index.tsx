import React from 'react';
import Svg, {SvgProps, Path, G, Circle} from 'react-native-svg';
type IconType = SvgProps & {
  size?: number;
};

const ICONS = {
  Menu: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <G>
        <Path
          d="M7 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm10-10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"
          stroke={props.color || '#000'}
        />
      </G>
    </Svg>
  ),
  Play: (props: IconType) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM10 16.5V7.5L16 12L10 16.5Z"
        fill="currentColor"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  RightArrow: (props: IconType) => (
    <Svg
      fill="currentColor"
      viewBox="0 0 20 20"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        fillRule="evenodd"
        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  LeftArrow: (props: IconType) => (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
        stroke={props.color || '#000' || '#000'}
      />
    </Svg>
  ),
  Notification: (props: IconType) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"
        stroke={props.color || '#000'}
      />
      <Path d="M13.73 21a2 2 0 01-3.46 0" stroke={props.color || '#000'} />
    </Svg>
  ),
  Steering: (props: IconType) => (
    <>
      <Svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        {...props}
        width={props.size}
        height={props.size}>
        <G>
          <Path
            d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zM8 13l-3.938.001A8.004 8.004 0 0 0 11 19.938V16a3 3 0 0 1-3-3zm11.938.001L16 13a3 3 0 0 1-3 3l.001 3.938a8.004 8.004 0 0 0 6.937-6.937zM14 12h-4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1zm-2-8a8.001 8.001 0 0 0-7.938 7H8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h3.938A8.001 8.001 0 0 0 12 4z"
            stroke={props.color || '#000'}
          />
        </G>
      </Svg>
    </>
  ),
  Help: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 16h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 11.9 13 12.5 13 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Account: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Medal: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <G>
        <Path
          d="M12 7a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 3.5l-1.323 2.68-2.957.43 2.14 2.085-.505 2.946L12 17.25l2.645 1.39-.505-2.945 2.14-2.086-2.957-.43L12 10.5zm1-8.501L18 2v3l-1.363 1.138A9.935 9.935 0 0 0 13 5.049L13 2zm-2 0v3.05a9.935 9.935 0 0 0-3.636 1.088L6 5V2l5-.001z"
          stroke={props.color || '#000'}
        />
      </G>
    </Svg>
  ),
  ChevronRight: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Info: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Reviews: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Refer: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Car: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Logout: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Sort: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M11 9H20V11H11zM11 13H18V15H11zM11 5H22V7H11zM11 17H16V19H11zM5 20L7 20 7 8 10 8 6 4 2 8 5 8z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  IncomingBookings: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M11 9H20V11H11zM11 13H18V15H11zM11 5H22V7H11zM11 17H16V19H11zM5 20L7 20 7 8 10 8 6 4 2 8 5 8z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Search: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Networking: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M19,3c-1.654,0-3,1.346-3,3c0,0.502,0.136,0.968,0.354,1.385l-1.116,1.302C14.599,8.254,13.829,8,13,8 c-0.739,0-1.425,0.216-2.02,0.566L9.566,7.152C9.834,6.658,10,6.101,10,5.5C10,3.57,8.43,2,6.5,2S3,3.57,3,5.5S4.57,9,6.5,9 c0.601,0,1.158-0.166,1.652-0.434L9.566,9.98C9.216,10.575,9,11.261,9,12c0,0.997,0.38,1.899,0.985,2.601l-1.692,1.692l0.025,0.025 C7.919,16.121,7.476,16,7,16c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3c0-0.476-0.121-0.919-0.318-1.318l0.025,0.025 l1.954-1.954C12.082,15.903,12.528,16,13,16c2.206,0,4-1.794,4-4c0-0.645-0.168-1.245-0.439-1.785l1.253-1.462 C18.178,8.911,18.578,9,19,9c1.654,0,3-1.346,3-3S20.654,3,19,3z M7,20c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1 S7.552,20,7,20z M5,5.5C5,4.673,5.673,4,6.5,4S8,4.673,8,5.5S7.327,7,6.5,7S5,6.327,5,5.5z M13,14c-1.103,0-2-0.897-2-2 s0.897-2,2-2s2,0.897,2,2S14.103,14,13,14z M19,7c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S19.552,7,19,7z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Chat: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M5,18v3.766l1.515-0.909l0,0L11.277,18H16c1.103,0,2-0.897,2-2V8c0-1.103-0.897-2-2-2H4C2.897,6,2,6.897,2,8v8 c0,1.103,0.897,2,2,2H5z M4,8h12v8h-5.277L7,18.234V16H4V8z"
        stroke={props.color || '#000'}
      />
      <Path
        d="M20,2h-1h-2.002H8C6.897,2,6,2.897,6,4h10.586H18c1.103,0,2,0.897,2,2v1.414V12v2c1.103,0,2-0.897,2-2V7V5V4 C22,2.897,21.103,2,20,2z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Dashboard: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <G>
        <Path stroke={props.color || '#000'} fill="none" d="M0 0h24v24H0z" />
        <Path
          stroke={props.color || '#000'}
          d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z"
        />
      </G>
    </Svg>
  ),
  Schedule: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        stroke={props.color || '#000'}
        d="M928 224H768v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H548v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H328v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H96c-17.7 0-32 14.3-32 32v576c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32zm-40 568H136V296h120v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h120v496zM416 496H232c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 136H232c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm308.2-177.4L620.6 598.3l-52.8-73.1c-3-4.2-7.8-6.6-12.9-6.6H500c-6.5 0-10.3 7.4-6.5 12.7l114.1 158.2a15.9 15.9 0 0 0 25.8 0l165-228.7c3.8-5.3 0-12.7-6.5-12.7H737c-5-.1-9.8 2.4-12.8 6.5z"
      />
    </Svg>
  ),
  Auditorium: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        stroke={props.color || '#000'}
        d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"
      />
    </Svg>
  ),
  Stall: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        stroke={props.color || '#000'}
        d="M22,5c0-1.654-1.346-3-3-3H5C3.346,2,2,3.346,2,5v2.831c0,1.053,0.382,2.01,1,2.746V19c0,1.103,0.897,2,2,2h4h6h4	c1.103,0,2-0.897,2-2v-8.424c0.618-0.735,1-1.692,1-2.746V5z M20,5v2.831c0,1.14-0.849,2.112-1.891,2.167L18,10	c-1.103,0-2-0.897-2-2V4h3C19.552,4,20,4.449,20,5z M10,4h4v4c0,1.103-0.897,2-2,2s-2-0.897-2-2V4z M4,5c0-0.551,0.448-1,1-1h3v4	c0,1.103-0.897,2-2,2L5.891,9.997C4.849,9.943,4,8.971,4,7.831V5z M10,19v-3h4v3H10z M16,19v-3c0-1.103-0.897-2-2-2h-4	c-1.103,0-2,0.897-2,2v3H5v-7.131c0.254,0.067,0.517,0.111,0.787,0.125C7.068,12.061,8.224,11.523,9,10.643	C9.733,11.475,10.807,12,12,12s2.267-0.525,3-1.357c0.776,0.88,1.934,1.419,3.213,1.351c0.271-0.014,0.533-0.058,0.787-0.125V19H16z"
      />
    </Svg>
  ),
  User: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        stroke={props.color || '#000'}
        d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"
      />
    </Svg>
  ),
  UserEdit: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 640 512"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  UsersAdd: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M892 772h-80v-80c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v80h-80c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h80v80c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-80h80c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM373.5 498.4c-.9-8.7-1.4-17.5-1.4-26.4 0-15.9 1.5-31.4 4.3-46.5.7-3.6-1.2-7.3-4.5-8.8-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 0 1-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6 24.7-25.3 57.9-39.1 93.2-38.7 31.9.3 62.7 12.6 86 34.4 7.9 7.4 14.7 15.6 20.4 24.4 2 3.1 5.9 4.4 9.3 3.2 17.6-6.1 36.2-10.4 55.3-12.4 5.6-.6 8.8-6.6 6.3-11.6-32.5-64.3-98.9-108.7-175.7-109.9-110.8-1.7-203.2 89.2-203.2 200 0 62.8 28.9 118.8 74.2 155.5-31.8 14.7-61.1 35-86.5 60.4-54.8 54.7-85.8 126.9-87.8 204a8 8 0 0 0 8 8.2h56.1c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5 29.4-29.4 65.4-49.8 104.7-59.7 3.8-1.1 6.4-4.8 5.9-8.8zM824 472c0-109.4-87.9-198.3-196.9-200C516.3 270.3 424 361.2 424 472c0 62.8 29 118.8 74.2 155.5a300.95 300.95 0 0 0-86.4 60.4C357 742.6 326 814.8 324 891.8a8 8 0 0 0 8 8.2h56c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5C505.8 695.7 563 672 624 672c110.4 0 200-89.5 200-200zm-109.5 90.5C690.3 586.7 658.2 600 624 600s-66.3-13.3-90.5-37.5a127.26 127.26 0 0 1-37.5-91.8c.3-32.8 13.4-64.5 36.3-88 24-24.6 56.1-38.3 90.4-38.7 33.9-.3 66.8 12.9 91 36.6 24.8 24.3 38.4 56.8 38.4 91.4-.1 34.2-13.4 66.3-37.6 90.5z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  UsersRemove: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M888 784H664c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h224c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM373.5 510.4c-.9-8.7-1.4-17.5-1.4-26.4 0-15.9 1.5-31.4 4.3-46.5.7-3.6-1.2-7.3-4.5-8.8-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 0 1-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6 24.7-25.3 57.9-39.1 93.2-38.7 31.9.3 62.7 12.6 86 34.4 7.9 7.4 14.7 15.6 20.4 24.4 2 3.1 5.9 4.4 9.3 3.2 17.6-6.1 36.2-10.4 55.3-12.4 5.6-.6 8.8-6.6 6.3-11.6-32.5-64.3-98.9-108.7-175.7-109.9-110.9-1.7-203.3 89.2-203.3 199.9 0 62.8 28.9 118.8 74.2 155.5-31.8 14.7-61.1 35-86.5 60.4-54.8 54.7-85.8 126.9-87.8 204a8 8 0 0 0 8 8.2h56.1c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5 29.4-29.4 65.4-49.8 104.7-59.7 3.9-1 6.5-4.7 6-8.7zM824 484c0-109.4-87.9-198.3-196.9-200C516.3 282.3 424 373.2 424 484c0 62.8 29 118.8 74.2 155.5a300.95 300.95 0 0 0-86.4 60.4C357 754.6 326 826.8 324 903.8a8 8 0 0 0 8 8.2h56c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5C505.8 707.7 563 684 624 684c110.4 0 200-89.5 200-200zm-109.5 90.5C690.3 598.7 658.2 612 624 612s-66.3-13.3-90.5-37.5a127.26 127.26 0 0 1-37.5-91.8c.3-32.8 13.4-64.5 36.3-88 24-24.6 56.1-38.3 90.4-38.7 33.9-.3 66.8 12.9 91 36.6 24.8 24.3 38.4 56.8 38.4 91.4-.1 34.2-13.4 66.3-37.6 90.5z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Bag: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        fillRule="evenodd"
        d="M14 5H2v9a1 1 0 001 1h10a1 1 0 001-1V5zM1 4v10a2 2 0 002 2h10a2 2 0 002-2V4H1z"
        clipRule="evenodd"
        stroke={props.color || '#000'}
      />
      <Path
        d="M8 1.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Gallery: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        fill="none"
        strokeWidth="2"
        d="M1,1 L19,1 L19,19 L1,19 L1,1 Z M5,19 L5,23 L23,23 L23,5.97061363 L18.9998921,5.97061363 M6,8 C6.55228475,8 7,7.55228475 7,7 C7,6.44771525 6.55228475,6 6,6 C5.44771525,6 5,6.44771525 5,7 C5,7.55228475 5.44771525,8 6,8 Z M2,18 L7,12 L10,15 L14,10 L19,16"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Videos: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 640 512"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M608 0H160a32 32 0 0 0-32 32v96h160V64h192v320h128a32 32 0 0 0 32-32V32a32 32 0 0 0-32-32zM232 103a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm352 208a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm-168 57H32a32 32 0 0 0-32 32v288a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM96 224a32 32 0 1 1-32 32 32 32 0 0 1 32-32zm288 224H64v-32l64-64 32 32 128-128 96 96z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  VideoCamera: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        fillRule="evenodd"
        d="M2.667 3.5c-.645 0-1.167.522-1.167 1.167v6.666c0 .645.522 1.167 1.167 1.167h6.666c.645 0 1.167-.522 1.167-1.167V4.667c0-.645-.522-1.167-1.167-1.167H2.667zM.5 4.667C.5 3.47 1.47 2.5 2.667 2.5h6.666c1.197 0 2.167.97 2.167 2.167v6.666c0 1.197-.97 2.167-2.167 2.167H2.667A2.167 2.167 0 01.5 11.333V4.667z"
        clipRule="evenodd"
        stroke={props.color || '#000'}
      />
      <Path
        fillRule="evenodd"
        d="M11.25 5.65l2.768-1.605a.318.318 0 01.482.263v7.384c0 .228-.26.393-.482.264l-2.767-1.605-.502.865 2.767 1.605c.859.498 1.984-.095 1.984-1.129V4.308c0-1.033-1.125-1.626-1.984-1.128L10.75 4.785l.502.865z"
        clipRule="evenodd"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Email: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"
        clipRule="evenodd"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Eye: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  EyeClose: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z"
        stroke={props.color || '#000'}
      />
      <Path
        d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Check: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Home: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Close: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Category: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M9,21h2h2h2h2h2h2v-2v-2v-2v-2v-2V9V7V5V3h-2h-2h-2h-2h-2H9H7H5H3v2v2v2v2v2v2v2v2v2h2h2H9z M19,17v2h-2h-2h-2v-6h6v2V17z M15,5h2h2v2v2v2h-6V5H15z M5,7V5h2h2h2v6H5V9V7z M5,19v-2v-2v-2h6v6H9H7H5z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Cart: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Order: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 16 16"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        fill-rule="evenodd"
        d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z"
        clip-rule="evenodd"
        stroke={props.color || '#000'}
      />
      <Path
        fill-rule="evenodd"
        d="M4.5 10.5A.5.5 0 015 10h3a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 8h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 6h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 4h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5z"
        clip-rule="evenodd"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Favorite: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  Support: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M12,2C6.486,2,2,6.486,2,12v0.714V16v0.143C2,17.167,2.897,18,4,18h1c0.553,0,1-0.448,1-1v-5.143c0-0.552-0.447-1-1-1 H4.092C4.648,6.987,7.978,4,12,4s7.352,2.987,7.908,6.857H19c-0.553,0-1,0.448-1,1V16v1v1c0,1.103-0.897,2-2,2h-2v-1h-4v3h2h2h2 c2.206,0,4-1.794,4-4c1.103,0,2-0.833,2-1.857V16v-3.286V12C22,6.486,17.514,2,12,2z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  TermAndCondition: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        stroke={props.color || '#000'}
      />
      <Path
        d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
  ExitApp: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
        stroke={props.color || '#000'}
      />
      <Path
        d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),

  Business: (props: IconType) => (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 512 512"
      {...props}
      width={props.size || 20}
      height={props.size || 20}>
      <Path
        d="M261 149.3V64H48v384h416V149.3H261zm-127.8 256H90.6v-42.7h42.6v42.7zm0-85.3H90.6v-42.7h42.6V320zm0-85.3H90.6V192h42.6v42.7zm0-85.4H90.6v-42.7h42.6v42.7zm85.2 256h-42.6v-42.7h42.6v42.7zm0-85.3h-42.6v-42.7h42.6V320zm0-85.3h-42.6V192h42.6v42.7zm0-85.4h-42.6v-42.7h42.6v42.7zm203 256H261v-42.7h42.6V320H261v-42.7h42.6v-42.7H261V192h160.4v213.3zm-37.6-170.6h-42.6v42.7h42.6v-42.7zm0 85.3h-42.6v42.7h42.6V320z"
        stroke={props.color || '#000'}
      />
    </Svg>
  ),
};

export default ICONS;
