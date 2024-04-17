import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/common/ui'
import { Checkbox } from '@/common/ui/Checkbox'
import { Button } from '@/common/ui/button'
import { Modal } from '@/common/ui/modal/modal'
import { Select, SelectItem } from '@/common/ui/select'
import { TextField } from '@/common/ui/textField'

const meta = {
  argTypes: {},
  component: Modal,
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalWitchTitle: Story = {
  args: {
    onOpenChange: (open: boolean) => console.log('is open', open),
    open: true,
    title: 'Title modal',
  },
}

export const ModalWitchContent: Story = {
  args: {
    children: (
      <Typography variant={'body1'}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab blanditiis ducimus eos expedita
        incidunt molestias nam neque placeat qui reprehenderit, tempore veniam! A, ad aspernatur
        dignissimos ex, fuga fugiat ipsam labore laborum maiores non praesentium quae quam
        repellendus. Adipisci commodi consequatur est fugiat fugit ipsam quidem sed sint! Alias
        animi, aperiam commodi eum, eveniet exercitationem, fuga illo itaque magni molestias odit
        provident voluptate voluptatem. Alias, aliquid aperiam dolores et eveniet exercitationem
        explicabo nemo odit, recusandae, rerum sed similique sit tenetur. Amet distinctio eligendi
        fugit hic impedit magnam mollitia, odit quos? Explicabo impedit maxime minima natus nemo
        quae quasi, quo ratione saepe voluptas. Labore modi molestiae nobis quia. Culpa deserunt
        dolor dolorum eum fugiat omnis possimus quaerat quisquam, sequi soluta. Ad aliquid explicabo
        iste minus perferendis perspiciatis quidem tempora? Accusantium adipisci aliquid autem
        consequatur dicta doloremque expedita explicabo illum, magni maxime mollitia odit
        perspiciatis provident, quibusdam quo recusandae reprehenderit, repudiandae sapiente sed
        tempore! Accusantium aliquam consequuntur debitis est eveniet itaque iure laboriosam magni
        molestiae nisi praesentium, quae, quasi quisquam veniam voluptas. Corporis facilis incidunt
        laudantium nam non perferendis quaerat quis sequi veritatis vitae? Aliquid facilis, nobis?
        At consectetur dolores dolorum eaque iure, laudantium tempora voluptates? Ab fugit
        reiciendis sunt tempore. Animi quam quidem unde ut. Aliquam dolorum enim maiores quae,
        suscipit totam. Accusamus adipisci animi dolor doloribus est labore magnam, officia officiis
        possimus provident quas quos, reprehenderit saepe sequi ullam velit voluptatibus voluptatum.
        Aliquid aperiam at blanditiis consectetur consequatur deleniti dignissimos doloremque
        dolorum earum exercitationem facere harum hic inventore iste laborum libero magni maxime,
        minus molestiae nam necessitatibus nostrum omnis optio possimus quia quibusdam quis quos
        reiciendis reprehenderit sint tempore, totam vero voluptas. Ad adipisci alias architecto
        deleniti deserunt dicta, eum exercitationem facere hic illum inventore laborum laudantium,
        libero, minus nostrum nulla quod ratione recusandae repellat saepe sit tempore temporibus
        voluptas?
      </Typography>
    ),
    onOpenChange: (open: boolean) => console.log('is open', open),
    open: true,
    title: 'Title modal with content',
  },
}

export const ModalFullExample: Story = {
  args: {
    children: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '34px',
          width: '100%',
        }}
      >
        <Select>
          <SelectItem value={'some'}>Some</SelectItem>
          <SelectItem value={'select'}>Select</SelectItem>
          <SelectItem value={'pls'}>Pls</SelectItem>
        </Select>
        <TextField placeholder={'input'} />
        <TextField placeholder={'input'} />
        <Checkbox text={`Don't click me!`} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}
        >
          <Button variant={'primary'}>Button primary</Button>
          <Button variant={'secondary'}>Button secondary</Button>
        </div>
      </div>
    ),
    onOpenChange: (open: boolean) => console.log('is open', open),
    open: true,
    title: 'Title modal',
  },
}
