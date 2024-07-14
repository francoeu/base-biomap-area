"use client";
import {
  ActionIcon,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  rem
} from '@mantine/core';
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons-react';
import Link from 'next/link';
import { ContactIconsList } from '../ContactIcons';
import Contact from './Contact';
import { ContactInfoFIlial, ContactInfoList } from '../ContactInfoFIlial';
import GoogleMaps from '../GoogleMaps';
  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: 400,
      boxSizing: 'border-box',
      borderRadius: theme.radius.md,
      padding: `calc(${theme.spacing.xl} * 2.5)`,
      [theme.fn.smallerThan('sm')]: {
        padding: `calc(${theme.spacing.xl} * 1.5)`,
      },
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      color: theme.white,
      lineHeight: 1,
    },
  
    description: {
      color: theme.colors[theme.primaryColor][0],
      maxWidth: rem(300),
  
      [theme.fn.smallerThan('sm')]: {
        maxWidth: '100%',
      },
    },
  
    form: {
      backgroundColor:'#292929',
      padding: theme.spacing.xl,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.lg,
    },
  
    social: {
      color: theme.white,
  
      '&:hover': {
        color: theme.colors[theme.primaryColor][1],
      },
    },
  
    input: {
      backgroundColor: theme.white,
      borderColor: theme.colors.gray[4],
      color: theme.black,
  
      '&::placeholder': {
        color: theme.colors.gray[5],
      },
    },
  
    inputLabel: {
      color: theme.white,
    },
  }));
  
  const social = [IconBrandWhatsapp, IconBrandFacebook, IconBrandInstagram];
  
  export function ContactUs() {


    const { classes } = useStyles();
  
    const icons = social.map((Icon, index) => (
      <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
        <Icon size="1.4rem" stroke={1.5} />
      </ActionIcon>
    ));
  
    return (
      <div className={`${classes.wrapper}   bg-[#1B1A1A]- relative-`}>

<SimpleGrid  cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>

<div>
    <Title className={'text-[#0FB268] z-20'} >NOSSO ENDEREÇO</Title>
      <Text className={`${classes.description} z-20`} mt="sm" mb={30}>
        Ficou interessado em nossos serviços? Entre em contato conosco e solicite um orçamento.
      </Text>

  <div className='z-20'>
    <Title className='p-4 text-green-600'>Matriz Salvador/BA</Title>
    <ContactIconsList variant="white" />
  </div>

</div>

 <div className="w-full h-[400px] md:mt-24 bg-gray-900-">
    <GoogleMaps src={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14781.98845815684!2d-38.454966!3d-12.980456!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71604e6af1f76cb%3A0xf2409eb57315f986!2sBIOMAP%20Topografia%20%26%20Loca%C3%A7%C3%B5es!5e1!3m2!1spt-BR!2sbr!4v1707700915302!5m2!1spt-BR!2sbr"} />
  </div>

{/* <div className=' flex justify-center w-full '>
  <div className=' md:w-9/12 rounded-lg py-4 px-6 bg-[#0e0d0d] shadow-lg '>
  <Contact />
  </div>

</div> */}

</SimpleGrid>

        
<SimpleGrid className='mt-10'  cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>

  <div className='z-20'>
<Title className='p-4 text-green-600'>Filial Maceió/AL</Title>
<ContactInfoList variant='white' />

<div className='flex mt-8 gap-4  z-20'>
              <Link
              target='_blank'
              href={'https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0'} 
              className='text-gray-300 cursor-pointer z-20'>
                <IconBrandWhatsapp />
              </Link>

              <Link 
              target='_blank'
              href={'https://www.facebook.com/Biomaptopografia/'} 
              className='text-gray-300 cursor-pointer z-20'>
                <IconBrandFacebook />
              </Link>
              
              <Link
              target='_blank'
              href={'https://www.instagram.com/biomap_topografia/'} 
              className='text-gray-300 cursor-pointer z-20'>
                <IconBrandInstagram />
              </Link>
              
            </div>
  </div>

  <div className="w-full h-[400px] bg-gray-900-">
    <GoogleMaps src={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29911.702622618734!2d-35.742746!3d-9.630202!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7014f258fceb6a1%3A0xf2ef8599e8d787ae!2sBiomap%20Topografia%20%26%20Loca%C3%A7%C3%B5es!5e1!3m2!1spt-BR!2sbr!4v1707701003362!5m2!1spt-BR!2sbr"} />
   
  </div>

{/* <div className=' flex justify-center w-full '>
  <div className=' md:w-9/12 rounded-lg py-4 px-6 bg-[#0e0d0d] shadow-lg '>
  <Contact />
  </div>

</div> */}

        </SimpleGrid>


      </div>
    );
  }