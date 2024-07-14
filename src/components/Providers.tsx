"use client";
import ArchivesProvider from "@/contexts/ArchivesContext";
import { CustomersProvider } from "@/contexts/CustomersContext";
import FoldersProvider from "@/contexts/FoldersContext";
import ProjectsProvider from "@/contexts/ProjectsContext";
import ActiveSectionContextProvider from "@/contexts/active-section-context";
import { defaultTheme } from "@/styles/themes/default";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from 'styled-components';

interface Props {
  children: ReactNode;
}
function Providers({ children }: Props) {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <ThemeProvider theme={defaultTheme}>

        <SessionProvider>
          <CustomersProvider>
            <FoldersProvider>
                <ProjectsProvider>
                    <ArchivesProvider>
                    <ActiveSectionContextProvider>
                      <Toaster position="top-center" />
                    {children}
                    </ActiveSectionContextProvider>
                    </ArchivesProvider>
                </ProjectsProvider>
              </FoldersProvider>
          </CustomersProvider>
        </SessionProvider>
      
      </ThemeProvider>
    </MantineProvider>

  )
  
 
}

export default Providers;
