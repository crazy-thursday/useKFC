/** @jsxImportSource react */
import { FC, useEffect, useState, useMemo, useCallback, useRef } from 'react'
import useKFC, { useParseSlogen } from '@crazy-thursday/use-kfc'
import {
  ChakraProvider,
  Button,
  LightMode,
  DarkMode,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  useToast
} from '@chakra-ui/react'
import Copy from 'react-copy-to-clipboard'
// @ts-ignore
import slogenList from '@crazy-thursday/use-kfc/slogen'

const KFC: FC = () => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const leastDestructiveRef = useRef()
  const [themeMode, changeThemeMode] = useState<string>(
    localStorage.getItem('theme')
  )
  const [refreshSignal, setRefreshSignal] = useState<number>(Date.now())
  const list = useParseSlogen(slogenList)
  const { slogen } = useKFC<number>({
    slogenList: list,
    skipDayCheck: true,
    refreshSignal
  })

  useEffect(() => {
    window.addEventListener('theme-change', (e) =>
      changeThemeMode((e as CustomEvent).detail as string)
    )
  }, [])

  const showSlogenModal = useCallback(() => {
    onOpen()
  }, [slogen])

  const handleCopy = useCallback(() => {
    onClose()
    toast({
      status: 'success',
      title: '复制成功! ',
      duration: 500
    })
  }, [])

  const ModeWrapper = useMemo(() => {
    return themeMode === 'dark' ? DarkMode : LightMode
  }, [themeMode])

  return (
    <div className="absolute z-10 top-24 md:top-56 left-1/2 -translate-x-1/2 container min-h-max max-h-[35vh] text-center">
      <ChakraProvider>
        <ModeWrapper>
          <Button colorScheme="purple" onClick={() => showSlogenModal()}>
            随机生成 KFC Slogen
          </Button>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={leastDestructiveRef}
            onClose={() => {
              onClose()
              setRefreshSignal(Date.now())
            }}
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogBody pt={4} maxH={60} overflow="auto">
                <pre className="whitespace-pre-wrap break-words text-[#242424]/90 dark:text-white/90">
                  {slogen}
                </pre>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={leastDestructiveRef} onClick={onClose}>
                  关闭
                </Button>
                <Copy text={slogen} onCopy={handleCopy}>
                  <Button colorScheme="purple" ml={3}>
                    复制
                  </Button>
                </Copy>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ModeWrapper>
      </ChakraProvider>
    </div>
  )
}

export default KFC
