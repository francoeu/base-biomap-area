import { Box, SimpleGrid, Stack, Text, ThemeIcon, createStyles } from '@mantine/core';
import { IconAt, IconMapPin, IconPhone, IconSun } from '@tabler/icons-react';

type ContactIconVariant = 'white' | 'gradient';

interface ContactIconStyles {
  variant: ContactIconVariant;
}

const useStyles = createStyles((theme, { variant }: ContactIconStyles) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundImage:
      variant === 'gradient'
        ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][6]
          } 100%)`
        : 'none',
    backgroundColor: 'transparent',
  },

  title: {
    color: variant === 'gradient' ? theme.colors.gray[6] : theme.colors[theme.primaryColor][0],
  },

  description: {
    color: variant === 'gradient' ? theme.black : theme.white,
  },
}));

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
  variant?: ContactIconVariant;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  variant = 'gradient',
  className,
  ...others
}: ContactIconProps) {
  const { classes, cx } = useStyles({ variant });
  return (
    <div className={cx(classes.wrapper, className)} {...others}>
      {variant === 'gradient' ? (
        <ThemeIcon size={40} radius="md" className={classes.icon}>
          <Icon size="1.5rem" />
        </ThemeIcon>
      ) : (
        <Box mr="md">
          <Icon size="1.5rem" />
        </Box>
      )}

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

interface ContactIconsListProps {
  data?: ContactIconProps[];
  variant?: ContactIconVariant;
}

const MOCKDATA = [
  // { title: 'Email', description: 'contato@biomapengenharia.com.br', icon: IconAt },
  // { title: 'Celular 1', description: '+55 (71) 99367-1611', icon: IconPhone },
  // { title: 'Celular 2', description: '+55 (71) 99259-1043', icon: IconPhone },
  { title: 'Endereço', description: 'Jardim Alagoas Center, Av. Comendador Francisco de Amorim Leão, 240 sala 14 - Pinheiro, Maceió - AL, 57057-780.', icon: IconMapPin },
  { title: 'Horário de Atendimento', description: '8h manhã. – 18h tarde.', icon: IconSun },
];

export function ContactInfoList({ data = MOCKDATA, variant }: ContactIconsListProps) {
  const items = data.map((item, index) => <ContactIcon key={index} variant={variant} {...item} />);
  return <Stack>{items}</Stack>;
}

export function ContactInfoFIlial() {
  return (
    <SimpleGrid className='z-20' cols={2} breakpoints={[{ maxWidth: 755, cols: 1 }]}>
      <Box
      className='z-20'
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundColor: theme.white,
        })}
      >
        <ContactInfoList />
      </Box>

      <Box
      className='z-20'
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundImage: `linear-gradient(135deg, ${theme.colors[theme.primaryColor][6]} 0%, ${
            theme.colors[theme.primaryColor][4]
          } 100%)`,
        })}
      >
        <ContactInfoList variant="white" />
      </Box>
    </SimpleGrid>
  );
}