import icons from "/src/images/icons.svg";

const SvgIcon = ({ name, width = 24, height = 24, className = "" }) => (
  <svg width={width} height={height} className={className} aria-hidden="true">
    <use href={`${icons}#${name}`} />
  </svg>
);

export default SvgIcon;
