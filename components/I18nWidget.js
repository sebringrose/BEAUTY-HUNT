import { useRouter } from 'next/router';
import Image from 'next/image';

import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput
} from "@mui/material";

import { LOCALES_MAP } from '../config/data';

const I18nWidget = () => {
  const router = useRouter();
  const {
    locale,
    locales,
    pathname,
    query,
    asPath
  } = router;

  const handleSelect = (e) => router.push({ pathname, query }, asPath, { locale: e.target.value });

  // blurring is weird here. Only working solution seems to be to use the onBlur event of the
  // MenuItems to trigger a timeout function that will blur the Select: https://github.com/mui-org/material-ui/issues/19634

  return <FormControl sx={{ minWidth: "70px" }}>
    <InputLabel id="locale-selector-label" htmlFor="locale-selector">Locale:</InputLabel>
    <Select
      labelid="locale-selector"
      id="locale-selector"
      value={locale}
      onChange={handleSelect}
      onBlur={() => console.log("blur")}
      input={<OutlinedInput label="Locale:" />}
    >
      {locales.map((locale) => <MenuItem key={locale} value={locale} className="flex-center">
        <Image src={LOCALES_MAP[locale].img.src} alt={LOCALES_MAP[locale].img.alt} width={24} height={24} />
        {/* <Typography>{LOCALES_MAP[locale].name}</Typography> */}
      </MenuItem>)}
    </Select>
  </FormControl>
}

export default I18nWidget;